// TODO: fix flow annotations
import { createAction } from 'redux-actions'

export const LOAD_GAME = 'LOAD_GAME'
export const LOAD_GAME_ASYNC_SUCCESS = 'LOAD_GAME_ASYNC_SUCCESS'
export const PLAYER_SELECTED = 'PLAYER_SELECTED'
export const SELECT_HAND_TILE = 'SELECT_HAND_TILE'
export const SELECT_GRID_COORD = 'SELECT_GRID_COORD'
export const SELECT_HAND_LANTERN = 'SELECT_HAND_LANTERN'
export const SELECT_GRID_LANTERN = 'SELECT_GRID_LANTERN'
export const SELECT_DEDICATION = 'SELECT_DEDICATION'

export const loadGame = createAction(LOAD_GAME)
export const loadGameAsyncSuccess = createAction(LOAD_GAME_ASYNC_SUCCESS)
export const playerSelected = createAction(PLAYER_SELECTED)
export const selectHandTile = createAction(SELECT_HAND_TILE)
export const selectGridCoord = createAction(SELECT_GRID_COORD)
export const selectHandLantern = createAction(SELECT_HAND_LANTERN)
export const selectGridLantern = createAction(SELECT_GRID_LANTERN)
export const selectDedication = createAction(SELECT_DEDICATION)

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
    if (result === 'SUCCESS') {
      dispatch(playerSelected(direction))
    }
  })
}

export const startGame = () => (dispatch: Function, getState: Function, socket: object) => {
  // Does this belong here or in some other middleware?
  socket.emit('start', '')
}

export const placeTile = () => (dispatch: Function, getState: Function, socket: object) => {
  const state = getState()
  // TODO rename tileIdx already a thing, this is idx in hand
  const selectedHandTileIdx = state.game.get('playerDir') && state.game.get('selectedHandTileIdx') > -1 && state.game.get('gameData') && state.game.get('gameData').players[state.game.get('playerDir')] ? state.game.get('gameData').players[state.game.get('playerDir')].hand[state.game.get('selectedHandTileIdx')].tileIdx : undefined
  const selectedGridCoord = state.game.get('selectedGridCoord')
  if (selectedHandTileIdx && selectedGridCoord) {
    socket.emit('placeTile', {
      tileIdx: selectedHandTileIdx,
      x: selectedGridCoord.x,
      y: selectedGridCoord.y,
    })
  }
}

export const tradeFavors = () => (dispatch: Function, getState: Function, socket: object) => {
  // TODO check if possible
  socket.emit('tradeFavors', {
    giveColor: getState().game.get('selectedHandLantern'),
    getColor: getState().game.get('selectedGridLantern'),
  })
}

export const buyDedication = (type, lanterns) => (dispatch: Function, getState: Function, socket: object) => {
  socket.emit('buyDedication', {
    dedicationType: type,
    lanterns: lanterns,
  })
}
