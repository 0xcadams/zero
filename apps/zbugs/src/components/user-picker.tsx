import {type Row} from '@rocicorp/zero';
import {useQuery} from '@rocicorp/zero/react';
import {useEffect, useMemo, useState} from 'react';
import {type Schema} from '../../schema.js';
import avatarIcon from '../assets/icons/avatar-default.svg';
import {useZero} from '../hooks/use-zero.js';
import {Combobox} from './combobox.js';

type Props = {
  onSelect?: ((user: User | undefined) => void) | undefined;
  selected?: {login?: string | undefined} | undefined;
  disabled?: boolean | undefined;
  unselectedLabel?: string | undefined;
  placeholder?: string | undefined;
  allowNone?: boolean | undefined;
  crewOnly?: boolean | undefined;
};

type User = Row<Schema['tables']['user']>;

export default function UserPicker({
  onSelect,
  selected,
  disabled,
  unselectedLabel,
  placeholder,
  allowNone = true,
  crewOnly = false,
}: Props) {
  const z = useZero();

  let q = z.query.user;
  if (disabled && selected?.login) {
    q = q.where('login', selected.login);
  } else if (crewOnly) {
    q = q.where('role', 'crew');
  }

  const [unsortedUsers] = useQuery(q);
  // TODO: Support case-insensitive sorting in ZQL.
  const users = useMemo(
    () => unsortedUsers.toSorted((a, b) => a.login.localeCompare(b.login)),
    [unsortedUsers],
  );

  // Preload the avatar icons so they show up instantly when opening the
  // dropdown.
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  useEffect(() => {
    let canceled = false;
    async function preload() {
      const avatars = await Promise.all(users.map(c => preloadAvatar(c)));
      if (canceled) {
        return;
      }
      setAvatars(Object.fromEntries(avatars));
    }
    void preload();
    return () => {
      canceled = true;
    };
  }, [users]);

  const handleSelect = (user: User | undefined) => {
    onSelect?.(user);
  };

  const selectedUser = selected && users.find(u => u.login === selected.login);

  const defaultItem = {
    text: placeholder ?? 'Select a user...',
    icon: avatarIcon,
    value: undefined,
  };

  const items = useMemo(() => {
    const mappedUsers = users.map(u => ({
      text: u.login,
      value: u,
      icon: avatars[u.id],
    }));
    if (allowNone) {
      return [
        {
          text: unselectedLabel ?? 'None',
          icon: avatarIcon,
          value: undefined,
        },
        ...mappedUsers,
      ];
    }
    return mappedUsers;
  }, [users, allowNone, avatars, unselectedLabel]);

  return (
    <Combobox
      disabled={disabled}
      onChange={c => handleSelect(c)}
      items={items}
      defaultItem={defaultItem}
      selectedValue={selectedUser ?? undefined}
      className="user-picker"
    />
  );
}

function preloadAvatar(user: User) {
  return new Promise<[string, string]>((res, rej) => {
    fetch(user.avatar)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          res([user.id, reader.result as string]);
        };
        reader.readAsDataURL(blob);
      })
      .catch(err => {
        rej('Error fetching the image: ' + err);
      });
  });
}
