// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import io from 'socket.io-client'

import App from '../shared/app'
import gameReducer from '../shared/reducer/game'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
/* eslint-enable no-underscore-dangle */

const socket = io(`${isProd ? 'http://yura.bryanching.net' : 'http://localhost'}:3000/`)

const store = createStore(combineReducers({
  game: gameReducer,
}),
  {},
  composeEnhancers(applyMiddleware(thunkMiddleware.withExtraArgument(socket))))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) => <Provider store={reduxStore}>
  <BrowserRouter>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </BrowserRouter>
</Provider>

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
