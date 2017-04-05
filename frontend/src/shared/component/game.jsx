// TODO: Flow annotate props?
import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'

import { Row, Col, SpacedCol } from './styled-flex'
import Lobby from '../container/lobby'
import Player from '../container/player'
import Grid from '../container/grid'
import Lantern from './lantern'
import Dedication from '../container//dedication'
import PlayArea from '../container/play-area'

const COLOR_ORANGE = 'Orange'
const COLOR_GREEN = 'Green'
const COLOR_PURPLE = 'Purple'
const COLOR_WHITE = 'White'
const COLOR_BLUE = 'Blue'
const COLOR_RED = 'Red'
const COLOR_BLACK = 'Black'
// eslint-disable-next-line no-unused-vars
const COLOR_ARRAY = [COLOR_ORANGE, COLOR_GREEN, COLOR_PURPLE, COLOR_WHITE, COLOR_BLUE, COLOR_RED, COLOR_BLACK]

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'
// eslint-disable-next-line no-unused-vars
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST]
const DedicationArea = styled(Col)`
  border: 2px solid black;
  border-radius: 5px 0 0 5px;
  border-right: 0;
  padding: 2px;
`
const LanternsArea = styled(Col)`
  border: 2px solid black;
  border-radius: 0 5px 5px 0;
  border-left: 0;
  padding: 2px;
`

class Game extends React.Component {
  componentDidMount() {
    this.props.loadGame(this.props.gameId)
  }

  props: {
  gameId: string,
  playerDir: string,
  gameData: object,
  loadGame: Function,
  gameId: string,
  }

  render() {
    const { playerDir, gameData, gameId } = this.props

    const FlexBlock = styled.div`
      flex: 1;
      display: flex;
      justify-content: center;
    `

    const LanternContainer = styled.div`
      height: 40px;
      width: 70px;
      margin: 2px;
      border: 2px;
      border-style: solid;
      border-color: black;
      opacity: ${props => (props.light ? 0.5 : 1)}
    `


    if (!gameData) return null
    switch (gameData.stage) {
      case 'NEW_GAME':
        return <Lobby />
      case 'GAME':
        return (
          <SpacedCol className="container">
            <Row>
              <FlexBlock>
                {DIR_NORTH in gameData.players &&
                  <Player player={gameData.players[DIR_NORTH]} active={playerDir === DIR_NORTH} left />
                    }
              </FlexBlock>

              <FlexBlock>
                <h3>{gameId}</h3>
              </FlexBlock>

              <FlexBlock>
                {DIR_EAST in gameData.players &&
                  <Player player={gameData.players[DIR_EAST]} active={playerDir === DIR_EAST} right />
                    }
              </FlexBlock>
            </Row>


            <Row
              style={{
                order: 2,
                alignItems: 'flex-end',
              }}
            >

              <FlexBlock>
                {DIR_WEST in gameData.players &&
                  <Player player={gameData.players[DIR_WEST]} active={playerDir === DIR_WEST} left />
                    }
              </FlexBlock>

              <FlexBlock>
                {playerDir && playerDir === gameData.turn &&
                  <PlayArea player={gameData.players[playerDir]} />
              }
              </FlexBlock>

              <FlexBlock>
                {DIR_SOUTH in gameData.players &&
                  <Player player={gameData.players[DIR_SOUTH]} active={playerDir === DIR_SOUTH} left />
                    }
              </FlexBlock>
            </Row>


            <Row
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                order: 1,
              }}
            >

              <LanternsArea>
                {Object.keys(gameData.lanterns).sort((color1, color2) => gameData.lanterns[color2] - gameData.lanterns[color1]).map(color => <LanternContainer
                  key={color}
                >
                  <Lantern color={color} count={gameData.lanterns[color]} />
                </LanternContainer>,
        )}
              </LanternsArea>

              <Grid />

              <DedicationArea>
                {
        ['uniques', 'threePair', 'fourOfAKind', 'fours']
          .filter(type => gameData.dedications[type].length > 0,
        )
        .map(type =>
          <div key={type}>
            <Dedication points={gameData.dedications[type][0]} type={type} />
          </div>)}
              </DedicationArea>

            </Row>
          </SpacedCol>
        )
      case 'END_GAME':
        return <div>{JSON.stringify(gameData.players)}</div>
      default:
        break
    }
    return null
  }
}

export default withRouter(Game)
