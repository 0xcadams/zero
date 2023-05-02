import classNames from 'classnames';
import {PIECE_DEFINITIONS} from './piece-definitions';
import React, {PointerEventHandler, useEffect} from 'react';
import type {PieceInfo} from './piece-info';
import type {ClientModel} from './client-model';
import {center} from './util';

export function Piece({
  piece,
  sizeScale,
  selectorID,
  myClient,
  onPointerDown,
  onPointerOver,
  onPointerOut,
  onRotationStart,
}: {
  piece: PieceInfo;
  sizeScale: number;
  selectorID: string | null;
  myClient: ClientModel;
  onPointerDown: PointerEventHandler;
  onPointerOver: PointerEventHandler;
  onPointerOut: PointerEventHandler;
  onRotationStart: (e: React.PointerEvent) => void;
}) {
  const def = PIECE_DEFINITIONS[parseInt(piece.id)];

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onPointerDown(e);
  };

  const handleRotationStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    onRotationStart(e);
  };

  const active = Boolean(selectorID);
  const animate = selectorID === myClient.id;

  const c = center({
    x: piece.x,
    y: piece.y,
    width: def.width,
    height: def.height,
  });
  const handleSize = 28; // see css
  const handlePos = {
    x: c.x - handleSize / 2,
    y: c.y - handleSize / 2,
  };

  const [isHandleMouseActive, setIsHandleMouseActive] = React.useState(false);
  useEffect(() => {
    if (!animate) {
      setIsHandleMouseActive(false);
      return;
    }

    const timerID = window.setTimeout(() => {
      setIsHandleMouseActive(true);
    }, 200);
    return () => {
      window.clearTimeout(timerID);
    };
  }, [animate]);

  const adjustTranslate = (pos: number, originalExtent: number) => {
    const scaledExtent = originalExtent * sizeScale;
    const diff = originalExtent - scaledExtent;
    return pos - diff / 2;
  };

  function onlyOnMouseDevices<T>(e: T, handler: (e: T) => void) {
    if ('ontouchstart' in window) {
      console.debug('ignoring event on touch device', e);
      return;
    }
    handler(e);
  }

  return (
    <>
      <svg
        version="1.1"
        viewBox={`0 0 ${def.width} ${def.height}`}
        width={def.width}
        height={def.height}
        className={classNames('piece', def.letter, {
          placed: piece.placed,
          active,
        })}
        style={{
          transform: `translate3d(${adjustTranslate(
            piece.x,
            def.width,
          )}px, ${adjustTranslate(piece.y, def.height)}px, 0px) rotate(${
            piece.rotation
          }rad) scale(${sizeScale})`,
        }}
        data-pieceid={piece.id}
        onPointerDown={e => handlePointerDown(e)}
        onPointerOver={e => onlyOnMouseDevices(e, onPointerOver)}
        onPointerOut={e => onlyOnMouseDevices(e, onPointerOut)}
      >
        {
          // TODO: We shouldn't really duplicate the id "shape" here but the CSS already had it that way.
        }
        <path
          data-pieceid={piece.id}
          id="shape"
          d={def.paths[0]}
          strokeWidth="1"
        />
      </svg>
      <div
        className={classNames('rotation-handle', {
          active,
          // TODO: would also be nice to animate out, but that's a bit more complicated and this look good enough.
          animate,
          'placed': piece.placed,
          'touch-active': isHandleMouseActive,
        })}
        style={{
          transform: `translate3d(${adjustTranslate(
            handlePos.x,
            def.width,
          )}px, ${adjustTranslate(handlePos.y, def.height)}px, 0px) rotate(${
            piece.handleRotation
          }rad)`,
        }}
      >
        <div
          onPointerOver={e => onlyOnMouseDevices(e, onPointerOver)}
          onPointerOut={e => onlyOnMouseDevices(e, onPointerOut)}
          onPointerDown={e => handleRotationStart(e)}
        >
          <div></div>
        </div>
      </div>
    </>
  );
}
