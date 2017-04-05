import React from 'react'
import styled from 'styled-components'

import { SpacedCol, SpacedRow } from './styled-flex'
import PlayerSelector from './player-selector'

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'

type Props = {
  addPlayer: Function,
  gameData: ?{},
  playerDir: ?string,
  startGame: Function,
}

const StartButton = styled.button`
  margin: 0 auto;
  font-size: 1.5em;
`

const Lobby = ({ addPlayer, gameData, playerDir, startGame }: Props) =>
  <SpacedCol className="container">
    <SpacedRow>
      <PlayerSelector handleSubmit={addPlayer} direction={DIR_NORTH} player={gameData.players[DIR_NORTH]} shouldShowSubmit={!playerDir} />
      <PlayerSelector handleSubmit={addPlayer} direction={DIR_EAST} player={gameData.players[DIR_EAST]} shouldShowSubmit={!playerDir} />
    </SpacedRow>
    {playerDir && Object.keys(gameData.players).length > 0 &&
    <StartButton onClick={() => { startGame() }}>Start Game</StartButton>
  }
    <SpacedRow>
      <PlayerSelector handleSubmit={addPlayer} direction={DIR_WEST} player={gameData.players[DIR_WEST]} shouldShowSubmit={!playerDir} />
      <PlayerSelector handleSubmit={addPlayer} direction={DIR_SOUTH} player={gameData.players[DIR_SOUTH]} shouldShowSubmit={!playerDir} />
    </SpacedRow>
  </SpacedCol>

export default Lobby
