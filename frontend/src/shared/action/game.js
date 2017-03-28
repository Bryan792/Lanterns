// TODO: fix flow annotations
import { createAction } from 'redux-actions'

export const LOAD_GAME = 'LOAD_GAME'
export const LOAD_GAME_ASYNC_REQUEST = 'LOAD_GAME_ASYNC_REQUEST'
export const LOAD_GAME_ASYNC_SUCCESS = 'LOAD_GAME_ASYNC_SUCCESS'
export const LOAD_GAME_ASYNC_FAILURE = 'LOAD_GAME_ASYNC_FAILURE'

export const loadGame = createAction(LOAD_GAME)
export const loadGameAsyncRequest = createAction(LOAD_GAME_ASYNC_REQUEST)
export const loadGameAsyncSuccess = createAction(LOAD_GAME_ASYNC_SUCCESS)
export const loadGameAsyncFailure = createAction(LOAD_GAME_ASYNC_FAILURE)

export const loadGameAsync = (gameId: string) => (dispatch: Function, getState: Function, socket) => {
  // Does this belong here or in some other middleware?
  socket.on('gameData', (msg) => {
    dispatch(loadGameAsyncSuccess(msg))
  })
  socket.emit('id', gameId)
}


export const addPlayer = (direction: string, name: string) => (dispatch: Function, getState: Function, socket: object) => {
  // Does this belong here or in some other middleware?
  socket.emit('player', `${direction} ${name}`)
}

export const startGame = () => (dispatch: Function, getState: Function, socket: object) => {
  // Does this belong here or in some other middleware?
  socket.emit('start', '')
}
