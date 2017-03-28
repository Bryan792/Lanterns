// @flow

import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import io from 'socket.io-client'

import helloReducer from '../shared/reducer/hello'
import gameReducer from '../shared/reducer/game'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  // TODO: for SSR, do we need socket here?
  const socket = io('http://localhost:3000/')

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }

  return createStore(combineReducers({
    hello: helloReducer,
    game: gameReducer,
  }),
    preloadedState, applyMiddleware(thunkMiddleware.withExtraArgument(socket)))
}

export default initStore
