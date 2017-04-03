// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  LOAD_GAME_ASYNC_SUCCESS,
  PLAYER_SELECTED,
  SELECT_HAND_TILE,
  ROTATE_HAND_TILE,
  SELECT_GRID_COORD,
  SELECT_HAND_LANTERN,
  SELECT_GRID_LANTERN,
  SELECT_DEDICATION,
} from '../action/game'

const initialState = Immutable.fromJS({
  gameData: '',
  gameId: '',
  playerDir: '',
  selectedHandTileIdx: -1,
  handRotations: {},
})

const gameReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOAD_GAME_ASYNC_SUCCESS:
      return state.set('gameData', action.payload)
    case PLAYER_SELECTED:
      return state.set('playerDir', action.payload)
    case SELECT_HAND_TILE:
      return state.set('selectedHandTileIdx', action.payload)
    case ROTATE_HAND_TILE: {
      // TODO Is it better just to set everything to 0 first? Otherwise there is a nonobvious assumption that if it doesn't exist, it is 0
      let numRotations = state.getIn(['handRotations', action.payload])
      numRotations = numRotations ? (numRotations += 1) % 4 : 1
      return state.setIn(['handRotations', action.payload], numRotations)
    }
    case SELECT_GRID_COORD:
      return state.set('selectedGridCoord', action.payload)
    case SELECT_HAND_LANTERN:
      return state.set('selectedHandLantern', action.payload)
    case SELECT_GRID_LANTERN:
      return state.set('selectedGridLantern', action.payload)
    case SELECT_DEDICATION:
      return state.set('selectedDedication', action.payload)
    default:
      return state
  }
}

export default gameReducer
