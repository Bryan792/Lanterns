// TODO: Flow annotate props?
import React from 'react'
import { withRouter } from 'react-router'

import PlayerSelector from './player-selector'
import Button from './button'
import Player from '../container/player'
import Grid from '../container/grid'

class Game extends React.Component {
  componentDidMount() {
    this.props.loadGame(this.props.gameId)
  }

  props: {
  gameId: string,
  playerDir: string,
  gameData: object,
  loadGame: Function,
  addPlayer: Function,
  startGame: Function,
  placeTile: Function,
  }

  render() {
    return (
      <div>
        {['North', 'East', 'South', 'West'].map(dir => (this.props.gameData) && <PlayerSelector handleSubmit={this.props.addPlayer} direction={dir} player={this.props.gameData.players[dir]} key={dir} />,
      )}
        {this.props.playerDir && this.props.gameData && this.props.gameData.players[this.props.playerDir] &&
        <div>
          <h2>You are {this.props.playerDir}</h2>
          <Player player={this.props.gameData.players[this.props.playerDir]} />
        </div>
        }
        <h2>{this.props.gameData.turn}</h2>
        <Button label="Start Game" handleClick={this.props.startGame} />
        {this.props.gameData && <Grid />}
        <Button label="Place Tile" handleClick={this.props.placeTile} />
        <p>{JSON.stringify(this.props.gameData)}</p>
      </div>
    )
  }
}

export default withRouter(Game)
