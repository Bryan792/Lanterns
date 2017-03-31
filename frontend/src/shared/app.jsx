// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import { APP_NAME } from './config'
import Nav from './component/nav'
import HomePage from './component/page/home'
import GamePage from './component/page/game-page'
import { HOME_PAGE_ROUTE, gameRoute } from './routes'

const App = () => <div>
  <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
  <Nav />
  <Switch>
    <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
    <Route path={gameRoute()} render={props => <GamePage {...props} />} />
  </Switch>
</div>

export default App
