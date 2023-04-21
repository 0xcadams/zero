import {useState} from 'react';
import styles from './How.module.css';
import ServerConsole from './ServerConsole';
import Demo2a from './Demos/Demo2a';
import Demo2b from './Demos/Demo2b';
import type {Reflect} from '@rocicorp/reflect';
import type {M} from '@/demo/shared/mutators';
import RotateClient from './RotateClient';
import Reset from './Reset';
import type {Latency} from '@/demo/shared/types';

export default function Demo2({
  reflect1,
  reflect2,
  reflectServer,
  reset,
  latency1,
  latency2,
  setLatency1,
  setLatency2,
}: {
  reflect1: Reflect<M>;
  reflect2: Reflect<M>;
  reflectServer: Reflect<M>;
  reset: () => void;
  latency1: Latency;
  latency2: Latency;
  setLatency1: (latency: Latency) => void;
  setLatency2: (latency: Latency) => void;
}) {
  const [toggleDemo, setToggleDemo] = useState(true);
  const toggleSwitchDemo = () => setToggleDemo(!toggleDemo);

  return (
    <>
      {/* Step 2: Render Reactively */}
      <div className={styles.howStep}>
        <h3 className={styles.howHeader}>
          <strong>Step 3:</strong> Render Reactively
        </h3>
        <p className={styles.howDescription}>
          Subscribe to changes in Reflect and render your UI reactively.
          There&apos;s no need to interpolate. You receive updates at 60fps,
          just as if the collaborator was local.
        </p>
        <p className={styles.howTryIt}>
          <strong>Try it:</strong> Notice how even when the latency is high,
          changes playback on the receiver exactly as they happened on the
          source.
        </p>
        <div className={styles.howGridLayout2}>
          <div className={styles.codeBlock}>
            {!toggleDemo ? (
              <>
                <div className={styles.codeBlockToggle}>
                  <button onClick={toggleSwitchDemo}>client.tsx</button>
                  <button className={styles.codeToggleActive}>
                    mutators.ts
                  </button>
                </div>
                <Demo2a />
              </>
            ) : (
              <>
                <div className={styles.codeBlockToggle}>
                  <button className={styles.codeToggleActive}>
                    client.tsx
                  </button>
                  <button onClick={toggleSwitchDemo}>mutators.ts</button>
                </div>
                <Demo2b />
              </>
            )}
          </div>
          <RotateClient
            reflect={reflect1}
            title="Client 1"
            latency={latency1}
            setLatency={setLatency1}
          />
          <ServerConsole reflect={reflectServer} />
          <RotateClient
            title="Client 2"
            reflect={reflect2}
            latency={latency2}
            setLatency={setLatency2}
          />
        </div>
        <Reset reset={reset} />
      </div>
    </>
  );
}
