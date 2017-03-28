// TODO: Flow annotate props?
import React from 'react'
import { withRouter } from 'react-router'

import PlayerSelector from './player-selector'

class Game extends React.Component {
  componentDidMount() {
    this.props.loadGame(this.props.gameId)
  }

  props: {
    gameId: string,
      loadGame: Function,
      addPlayer: Function,
      gameData: object,
  }

  render() {
    return (
      <div>
        {['NORTH', 'EAST', 'SOUTH', 'WEST'].map(dir =>
         (this.props.gameData) && <PlayerSelector handleSubmit={this.props.addPlayer} direction={dir} player={this.props.gameData.players[dir]} />,
        )}
        {JSON.stringify(this.props.gameData)}
      </div>
    )
  }
}

export default withRouter(Game)
