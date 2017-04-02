// TODO: Flow annotate props?
import React from 'react'
import { withRouter } from 'react-router'
import Combinatorics from 'js-combinatorics'

import Lobby from '../container/lobby'
import Player from '../container/player'
import Grid from '../container/grid'
import Lantern from './lantern'
import Dedication from './dedication'
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

    const possibleDedications = {
      uniques: [],
      threePair: [],
      fourOfAKind: [],
    }

    if (gameData && playerDir && gameData.players[playerDir]) {
      const lanterns = gameData.players[playerDir].lanterns
      if (Object.keys(lanterns).every(color => lanterns[color] >= 1)) {
        possibleDedications.uniques.push({
          [COLOR_ORANGE]: 1,
          [COLOR_GREEN]: 1,
          [COLOR_PURPLE]: 1,
          [COLOR_WHITE]: 1,
          [COLOR_BLUE]: 1,
          [COLOR_RED]: 1,
          [COLOR_BLACK]: 1,
        })
      }

      // TODO Explain
      const threePairColors = Object.keys(lanterns).filter(color => lanterns[color] >= 2)
      if (threePairColors.length >= 3) {
        possibleDedications.threePair = Combinatorics.combination(
          threePairColors
            .map(color => ({
              [color]: 2,
            })), 3)
          .toArray()
          .map(arrayOfArrays => arrayOfArrays.reduce((acc, lantern) => ({
            ...acc, ...lantern,
          }), {}))
      }

      const fourSameColors = Object.keys(lanterns).filter(color => lanterns[color] >= 4)
      fourSameColors.forEach((color) => {
        possibleDedications.fourOfAKind.push({
          [color]: 4,
        })
      })
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

    return (
      <div>
        {gameData &&
        <div>
          {gameData.turn === 'NEW_GAME' ?
            <Lobby />
          :
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >

              {Object.keys(gameData.players).map(dir =>
                <div
                  style={{
                    ...styles[dir],
                    border: 2,
                    borderStyle: 'solid',
                    borderColor: dir === playerDir ? 'yellow' : 'black',
                  }}
                  key={dir}
                >
                  <Player player={gameData.players[dir]} />
                </div>,
        )}

              <h2>{gameData.turn}</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
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
        ['uniques', 'threePair', 'fourOfAKind']
          .filter(type => gameData.dedications[type].length > 0,
        )
        .map(type =>
          <div key={type}>
            <Dedication points={gameData.dedications[type][0]} type={type} />
          </div>)}
                </div>

              </div>


              {playerDir && playerDir === gameData.turn &&
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  alignSelf: 'center',
                }}
              >
                <PlayArea player={gameData.players[playerDir]} />

              </div>
        }
            </div>
      }
        </div>
      }
      </div>
    )
  }
}

export default withRouter(Game)
