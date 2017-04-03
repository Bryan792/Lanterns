// TODO: Flow annotate props?
import React from 'react'
import { withRouter } from 'react-router'

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

class Game extends React.Component {
  componentDidMount() {
    this.props.loadGame(this.props.gameId)
  }

  props: {
  gameId: string,
  playerDir: string,
  gameData: object,
  loadGame: Function,
  selectedGridLantern: ?string,
  selectGridLantern: Function,
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

    const { playerDir, gameData, selectedGridLantern, selectGridLantern } = this.props

    return (
      <div className="container">
        {gameData &&
        <div className="container">
          {gameData.stage === 'NEW_GAME' &&
            <Lobby />
          }
          {gameData.stage === 'END_GAME' &&
          <div>{JSON.stringify(gameData.players)}</div>
          }
          {(gameData.stage === 'GAME') &&
            <div
              className="container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >


              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    order: 0,
                  }}
                >
                  {DIR_NORTH in gameData.players &&

                    <div
                      style={{
                        marginRight: 'auto',
                        border: 2,
                        borderStyle: 'solid',
                        borderColor: DIR_NORTH === playerDir ? 'yellow' : 'black',
                      }}
                    >
                      <Player player={gameData.players[DIR_NORTH]} />
                    </div>
                    }
                </div>

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    order: 2,
                  }}
                >

                  {DIR_EAST in gameData.players &&
                    <div
                      style={{
                        marginLeft: 'auto',
                        border: 2,
                        borderStyle: 'solid',
                        borderColor: DIR_EAST === playerDir ? 'yellow' : 'black',
                      }}
                    >
                      <Player player={gameData.players[DIR_EAST]} />
                    </div>
                    }
                </div>


                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    order: 1,
                  }}
                />

              </div>


              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  order: 2,
                  alignItems: 'flex-end',
                }}
              >

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    order: 0,
                  }}
                >
                  {DIR_WEST in gameData.players &&

                    <div
                      style={{
                        marginRight: 'auto',
                        border: 2,
                        borderStyle: 'solid',
                        borderColor: DIR_WEST === playerDir ? 'yellow' : 'black',
                      }}
                    >
                      <Player player={gameData.players[DIR_WEST]} />
                    </div>
                    }
                </div>

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    order: 2,
                  }}
                >

                  {DIR_SOUTH in gameData.players &&
                    <div
                      style={{
                        marginLeft: 'auto',
                        border: 2,
                        borderStyle: 'solid',
                        borderColor: DIR_SOUTH === playerDir ? 'yellow' : 'black',
                      }}
                    >
                      <Player player={gameData.players[DIR_SOUTH]} />
                    </div>
                    }
                </div>


                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    order: 1,
                  }}
                >
                  {playerDir && playerDir === gameData.turn &&
                  <PlayArea player={gameData.players[playerDir]} />
              }

                </div>
              </div>

              <div
                style={{
                  margin: 'auto 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  order: 1,
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {Object.keys(gameData.lanterns).sort((color1, color2) => gameData.lanterns[color2] - gameData.lanterns[color1]).map(color => <button
                    style={{
                      ...style,
                      height: 40,
                      width: 70,
                      borderStyle: 'solid',
                      borderColor: color === selectedGridLantern ? 'yellow' : 'black',
                      border: 2,
                      margin: 2,
                    }}
                    onClick={() => {
                      selectGridLantern(color)
                    }}
                    key={color}
                  >
                    <Lantern color={color} count={gameData.lanterns[color]} />
                  </button>,
        )}
                </div>
                <Grid />

                <div>
                  {
        ['uniques', 'threePair', 'fourOfAKind', 'fours']
          .filter(type => gameData.dedications[type].length > 0,
        )
        .map(type =>
          <div key={type}>
            <Dedication points={gameData.dedications[type][0]} type={type} />
          </div>)}
                </div>

              </div>


            </div>
      }
        </div>
      }
      </div>
    )
  }
}

export default withRouter(Game)
