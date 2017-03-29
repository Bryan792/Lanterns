// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  LOAD_GAME_ASYNC_SUCCESS,
  PLAYER_SELECTED,
} from '../action/game'

const initialState = Immutable.fromJS({
  gameData: '',
  gameId: '',
  playerDir: '',
})

const gameReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOAD_GAME_ASYNC_SUCCESS:
      return state.set('gameData', action.payload)
    case PLAYER_SELECTED:
      return state.set('playerDir', action.payload)
    default:
      return state
  }
}

export default gameReducer
