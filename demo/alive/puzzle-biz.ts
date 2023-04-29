import type {Reflect} from '@rocicorp/reflect';
import type {M} from '../shared/mutators';
import {PieceDefinition, PIECE_DEFINITIONS} from './piece-definitions';
import type {PieceInfo} from './piece-info';
import type {PieceModel} from './piece-model';
import {
  coordinateToPosition,
  distance,
  Position,
  positionToCoordinate,
  Rect,
} from './util';

export const handleDrag = (
  clientID: string,
  e: {pageX: number; pageY: number},
  piece: PieceModel,
  offset: Position,
  r: Reflect<M>,
  home: Rect,
  stage: Rect,
) => {
  const def = PIECE_DEFINITIONS[parseInt(piece.id)];

  const pos = {
    x: e.pageX - offset.x,
    y: e.pageY - offset.y,
  };

  if (pos.x < stage.x) {
    pos.x = stage.x;
  }
  if (pos.y < stage.y) {
    pos.y = stage.y;
  }
  if (pos.x + def.width > stage.right()) {
    pos.x = stage.right() - def.width;
  }
  if (pos.y + def.height > stage.bottom()) {
    pos.y = stage.bottom() - def.height;
  }

  const coordinate = positionToCoordinate(pos, home, stage);
  r.mutate.updatePiece({id: piece.id, ...coordinate});

  if (checkSnap(piece, def, pos, r, home, stage)) {
    r.mutate.updateClient({id: clientID, selectedPieceID: ''});
    return true;
  }
  return false;
};

export function checkSnap(
  piece: PieceModel,
  def: PieceDefinition,
  currPos: Position,
  r: Reflect<M>,
  home: Rect,
  stage: Rect,
) {
  const homePos = coordinateToPosition(def, home, stage);
  const dist = distance(currPos, homePos);
  const distThresh = 10;
  const rotThresh = Math.PI / 6;
  if (
    dist <= distThresh &&
    (piece.rotation <= rotThresh || Math.PI * 2 - piece.rotation <= rotThresh)
  ) {
    r.mutate.updatePiece({
      id: piece.id,
      x: def.x,
      y: def.y,
      rotation: 0,
      placed: true,
    });
    return true;
  }
  return false;
}

export function selectIfAvailable(
  clientID: string,
  piece: PieceInfo,
  r: Reflect<M>,
) {
  if (piece.placed) {
    console.log('cannot select already placed pieces');
    return false;
  }

  // Pieces selected by others can't be selected.
  // Pieces selected by others can't be selected.
  if (piece.selector !== null && piece.selector !== clientID) {
    console.info(
      `Client ${clientID} cannot select piece ${piece.id}, already selected by ${piece.selector}}`,
    );
    return false;
  }

  r.mutate.updateClient({id: clientID, selectedPieceID: piece.id});
  return true;
}
