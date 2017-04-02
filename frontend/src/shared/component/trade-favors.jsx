// TODO: fix flow annotations
import React from 'react'

import Lantern from './lantern'
import Button from './button'

const COLOR_ORANGE = 'Orange'
const COLOR_GREEN = 'Green'
const COLOR_PURPLE = 'Purple'
const COLOR_WHITE = 'White'
const COLOR_BLUE = 'Blue'
const COLOR_RED = 'Red'
const COLOR_BLACK = 'Black'
// eslint-disable-next-line no-unused-vars
const COLOR_ARRAY = [COLOR_ORANGE, COLOR_GREEN, COLOR_PURPLE, COLOR_WHITE, COLOR_BLUE, COLOR_RED, COLOR_BLACK]

class TradeFavors extends React.Component {
  constructor(props: props) {
    super(props)
    // TODO A lot of this is repeated in render(), refactorable?
    const giveLanterns = props.gameData.players[props.playerDir].lanterns
    const getLanterns = props.gameData.lanterns
    this.state = {
      giveColor: Object.keys(giveLanterns).filter(color => giveLanterns[color] > 0).sort((color1, color2) => giveLanterns[color2] - giveLanterns[color1])[0],
      getColor: Object.keys(getLanterns).filter(color => getLanterns[color] > 0).sort((color1, color2) => getLanterns[color2] - getLanterns[color1])[0],
    }
  }

  state: {
    giveColor: string,
    getColor: string,
  }

  props: {
    playerDir: string,
      gameData: {
        players: {},
        lanterns: {},
      },
    tradeFavors: Function,
    skipTurnStep: Function,
  }

  render() {
    const { playerDir, gameData, tradeFavors, skipTurnStep } = this.props
    const giveLanterns = gameData.players[playerDir].lanterns
    const getLanterns = gameData.lanterns

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          Give
        {Object.keys(giveLanterns).filter(color => giveLanterns[color] > 0).sort((color1, color2) => giveLanterns[color2] - giveLanterns[color1]).map(color =>
          <button
            style={{
              height: 70,
              width: 40,
              borderStyle: 'solid',
              borderColor: 'black',
              border: 2,
              margin: 2,
              opacity: color === this.state.giveColor ? 1 : 0.5,
            }}
            onClick={() => {
              this.setState({ giveColor: color })
            }}
            key={color}
          >
            <Lantern color={color} count={giveLanterns[color]} />
          </button>,
        )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
        Get
        {Object.keys(getLanterns).filter(color => getLanterns[color] > 0).sort((color1, color2) => getLanterns[color2] - getLanterns[color1]).map(color => <button
          style={{
            height: 70,
            width: 40,
            borderStyle: 'solid',
            borderColor: 'black',
            border: 2,
            margin: 2,
            opacity: color === this.state.getColor ? 1 : 0.5,
          }}
          onClick={() => {
            this.setState({ getColor: color })
          }}
          key={color}
        >
          <Lantern color={color} count={getLanterns[color]} />
        </button>,
        )}
        </div>
        <Button
          label="Trade Favors" handleClick={() => {
            tradeFavors(this.state.giveColor, this.state.getColor)
          }}
        />
        <Button label="Skip" handleClick={skipTurnStep} />
      </div>
    )
  }
}

export default TradeFavors
