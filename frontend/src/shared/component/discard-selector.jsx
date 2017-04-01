// TODO: fix flow annotations
import React from 'react'

import Lantern from './lantern'

const COLOR_ORANGE = 'Orange'
const COLOR_GREEN = 'Green'
const COLOR_PURPLE = 'Purple'
const COLOR_WHITE = 'White'
const COLOR_BLUE = 'Blue'
const COLOR_RED = 'Red'
const COLOR_BLACK = 'Black'
// eslint-disable-next-line no-unused-vars
const COLOR_ARRAY = [COLOR_ORANGE, COLOR_GREEN, COLOR_PURPLE, COLOR_WHITE, COLOR_BLUE, COLOR_RED, COLOR_BLACK]

class DiscardSelector extends React.Component {
  constructor(props: props) {
    super(props)
    this.state = {
      lanterns: {
      },
    }
  }

  state: {
    lanterns: {},
  }

  props: {
    lanterns: {},
    handleDiscard: Function,
  }

  render() {
    const { lanterns, handleDiscard } = this.props
    return (
      <div>
        {Object.keys(lanterns).filter(color => lanterns[color] > 0).sort((color1, color2) => lanterns[color2] - lanterns[color1]).map(color => <button
          style={{
            height: 70,
            width: 40,
            borderStyle: 'solid',
            borderColor: 'black',
            border: 2,
            margin: 2,
          }}
          onClick={() => {
            if (this.state.lanterns[color] !== lanterns[color]) { this.setState({ lanterns: { ...this.state.lanterns, [color]: (this.state.lanterns[color] || 0) + 1 } }) }
          }}
          key={color}
        >
          <Lantern color={color} count={this.state.lanterns[color] || 0} />
        </button>,
        )}
        <button
          onClick={() => {
            handleDiscard(lanterns)
          }}
        >Discard</button>
      </div>
    )
  }
}

export default DiscardSelector
