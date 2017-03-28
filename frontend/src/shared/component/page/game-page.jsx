// @flow

import React from 'react'
import Helmet from 'react-helmet'

import { APP_NAME } from '../../config'
import Game from '../../container/game'

const GamePage = (props: {match: {params: {gameId: string}}}) =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Lanterns' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <h1>Game Page {props.match.params.gameId}</h1>
    <Game gameId={props.match.params.gameId} />
  </div>

export default GamePage
