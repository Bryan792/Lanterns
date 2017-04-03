import React from 'react'

import PlayerSelector from './player-selector'

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST]

type Props = {
  addPlayer: Function,
  gameData: ?{},
  playerDir: ?string,
  startGame: Function,
}

const styles = {
  [DIR_NORTH]: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  [DIR_EAST]: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  [DIR_SOUTH]: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  [DIR_WEST]: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}

const Lobby = ({ addPlayer, gameData, playerDir, startGame }: Props) =>
  <div
    className="container"
    style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {DIR_ARRAY.map(dir => (
      <div style={styles[dir]} key={dir}>
        <PlayerSelector handleSubmit={addPlayer} direction={dir} player={gameData.players[dir]} key={dir} shouldShowSubmit={!playerDir} />
      </div>
  ))}
    <button onClick={() => { startGame() }}>Start Game</button>
  </div>

export default Lobby
