// TODO: fix flow annotations
import { createAction } from 'redux-actions'

export const LOAD_GAME = 'LOAD_GAME'
export const LOAD_GAME_ASYNC_SUCCESS = 'LOAD_GAME_ASYNC_SUCCESS'
export const PLAYER_SELECTED = 'PLAYER_SELECTED'

export const loadGame = createAction(LOAD_GAME)
export const loadGameAsyncSuccess = createAction(LOAD_GAME_ASYNC_SUCCESS)
export const playerSelected = createAction(PLAYER_SELECTED)

export const loadGameAsync = (gameId: string) => (dispatch: Function, getState: Function, socket) => {
  // Does this belong here or in some other middleware?
  socket.on('gameData', (msg) => {
    dispatch(loadGameAsyncSuccess(msg))
  })
  socket.emit('id', gameId)
}


export const addPlayer = (direction: string, name: string) => (dispatch: Function, getState: Function, socket: object) => {
  // Does this belong here or in some other middleware?
  socket.emit('player', `${direction} ${name}`, (result) => {
    if (result === 'SUCCESS') { dispatch(playerSelected(direction)) }
  })
}

export const startGame = () => (dispatch: Function, getState: Function, socket: object) => {
  // Does this belong here or in some other middleware?
  socket.emit('start', '')
}
