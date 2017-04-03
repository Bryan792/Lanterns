// @flow

import React from 'react'
import Helmet from 'react-helmet'

import Game from '../../container/game'

const GamePage = (props: {match: {params: {gameId: string}}}) =>
  <div className="container">
    <Helmet
      meta={[
        { name: 'description', content: `Lanterns: ${props.match.params.gameId}` },
        { property: 'og:title', content: `Lanterns: ${props.match.params.gameId}` },
      ]}
    />
    <h2
      style={{
        alignSelf: 'center',
      }}
    >{props.match.params.gameId}</h2>
    <Game gameId={props.match.params.gameId} />
  </div>

export default GamePage
