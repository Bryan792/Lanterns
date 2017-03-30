// TODO: Flow annotate props?
import React from 'react'
import { withRouter } from 'react-router'

import PlayerSelector from './player-selector'
import Button from './button'
import Player from '../container/player'
import Grid from '../container/grid'
import Lantern from './lantern'

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
  selectedGridLantern: ?string,
  selectGridLantern: Function,
  tradeFavors: Function,
  }

  render() {
    const style = {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      border: 0,
      WebkitAppearance: 'none',
      MozAppearance: 'none',
    }
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


        {this.props.gameData &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {
        Object.keys(this.props.gameData.lanterns).sort((color1, color2) => this.props.gameData.lanterns[color2] - this.props.gameData.lanterns[color1]).map(color => <button
          style={{
            ...style,
            height: 70,
            width: 40,
            borderStyle: 'solid',
            borderColor: color === this.props.selectedGridLantern ? 'yellow' : 'black',
            border: 2,
          }}
          onClick={() => {
            this.props.selectGridLantern(color)
          }}
          key={color}
        >
          <Lantern color={color} count={this.props.gameData.lanterns[color]} />
        </button>,
        )}
        </div>}

        <Button label="Place Tile" handleClick={this.props.placeTile} />
        <Button label="Trade Favors" handleClick={this.props.tradeFavors} />
        <p>{JSON.stringify(this.props.gameData)}</p>
      </div>
    )
  }
}

export default withRouter(Game)
