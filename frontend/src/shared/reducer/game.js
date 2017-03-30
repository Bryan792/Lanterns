// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  LOAD_GAME_ASYNC_SUCCESS,
  PLAYER_SELECTED,
  SELECT_HAND_TILE,
  SELECT_GRID_COORD,
  SELECT_HAND_LANTERN,
  SELECT_GRID_LANTERN,
} from '../action/game'

const initialState = Immutable.fromJS({
  gameData: '',
  gameId: '',
  playerDir: '',
  selectedHandTileIdx: -1,
})

const gameReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOAD_GAME_ASYNC_SUCCESS:
      return state.set('gameData', action.payload).delete('selectedGridCoord')
    case PLAYER_SELECTED:
      return state.set('playerDir', action.payload)
    case SELECT_HAND_TILE:
      return state.set('selectedHandTileIdx', action.payload)
    case SELECT_GRID_COORD:
      return state.set('selectedGridCoord', action.payload)
    case SELECT_HAND_LANTERN:
      return state.set('selectedHandLantern', action.payload)
    case SELECT_GRID_LANTERN:
      return state.set('selectedGridLantern', action.payload)
    default:
      return state
  }
}

export default gameReducer
