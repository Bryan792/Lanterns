// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import io from 'socket.io-client'

import gameReducer from '../shared/reducer/game'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined
  // TODO: for SSR, do we need socket here?
  const socket = io('http://localhost:3000/')

  return createStore(combineReducers({
    game: gameReducer,
  }),
    preloadedState, applyMiddleware(thunkMiddleware.withExtraArgument(socket)))
}

export default initStore
