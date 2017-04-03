import React from 'react'
import Immutable from 'immutable'

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

class DedicationSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dedicationType: '',
      lanterns: Immutable.Set(),
    }
  }

  state: {
    dedicationType: string,
    lanterns: {},
  }

  props: {
    gameData: {},
    playerDir: string,
    skipTurnStep: Function,
    buyDedication: Function,
  }

  render() {
    const possibleDedications = {
    }

    const { gameData, playerDir, skipTurnStep, buyDedication } = this.props
    const playerLanterns = gameData.players[playerDir].lanterns

    if (gameData && playerDir && gameData.players[playerDir]) {
      const lanterns = gameData.players[playerDir].lanterns
      if (Object.keys(lanterns).every(color => lanterns[color] >= 1)) {
        possibleDedications.uniques = COLOR_ARRAY
      }

      const threePairColors = Object.keys(lanterns).filter(color => lanterns[color] >= 2)
      if (threePairColors.length >= 3) {
        possibleDedications.threePair = threePairColors
      }

      const fourOfAKindColors = Object.keys(lanterns).filter(color => lanterns[color] >= 4)
      if (fourOfAKindColors.length > 0) { possibleDedications.fourOfAKind = fourOfAKindColors }
    }

    const neededColors = {
      uniques: 7,
      threePair: 3,
      fourOfAKind: 1,
    }

    return (
      <div>
        {['uniques', 'threePair', 'fourOfAKind'].filter(type => (gameData.dedications[type].length > 0 || gameData.dedications.fours.length > 0) && possibleDedications[type]).map(type => <button
          onClick={() => {
            this.setState({
              dedicationType: type,
              lanterns: Immutable.Set.of(...possibleDedications[type].slice(-neededColors[type])),
            })
          }}
          key={type}
        >
          {type}
        </button>,
      )}

        {possibleDedications[this.state.dedicationType] &&
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >

              {possibleDedications[this.state.dedicationType].sort((color1, color2) => playerLanterns[color2] - playerLanterns[color1]).map(color => <button
                style={{
                  height: 70,
                  width: 40,
                  border: 2,
                  borderStyle: 'solid',
                  borderColor: 'black',
                  margin: 2,
                  opacity: this.state.lanterns.includes(color) ? 1 : 0.3,
                }}
                onClick={() => {
                  this.setState({
                    lanterns: this.state.lanterns.includes(color) ? this.state.lanterns.delete(color) : this.state.lanterns.add(color),
                  })
                }}
                key={color}
              >
                <Lantern color={color} count={playerLanterns[color]} />
              </button>,
      )}
            </div>
            {neededColors[this.state.dedicationType] !== this.state.lanterns.size ?
              <div>
            Select exactly {neededColors[this.state.dedicationType]} colors
      </div>
:

              <button
                style={{
                }}
                onClick={() => {
                  const giveLanterns = {}
                  this.state.lanterns.forEach((color) => {
                    switch (this.state.dedicationType) {
                      case 'uniques':
                        giveLanterns[color] = 1
                        break
                      case 'threePair':
                        giveLanterns[color] = 2
                        break
                      case 'fourOfAKind':
                        giveLanterns[color] = 4
                        break
                      default:
                        break
                    }
                  })

                  buyDedication(this.state.dedicationType, giveLanterns)
                }}
              >
      Buy
    </button>
    }
          </div>
      }
        <Button label="Skip" handleClick={skipTurnStep} />

      </div>
    )
  }
}

export default DedicationSelector
