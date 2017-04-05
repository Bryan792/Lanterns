// TODO: fix flow annotations
import React from 'react'
import styled from 'styled-components'

import { Row, Col } from './styled-flex'
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

const LanternContainer = styled.div`
      height: 70px;
      width: 40px;
      margin: 2px;
      border: 2px;
      border-style: solid;
      border-color: black;
    `

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

  componentWillReceiveProps() {
    this.setState({ lanterns: {} })
  }

  props: {
    lanterns: {},
    handleDiscard: Function,
  }

  render() {
    const { lanterns, handleDiscard } = this.props
    return (
      <Col>
        <Row>
          {Object.keys(lanterns).filter(color => lanterns[color] > 0).sort((color1, color2) => lanterns[color2] - lanterns[color1]).map(color =>
            <Col key={color}>
              <button
                onClick={() => {
                  if (this.state.lanterns[color] !== lanterns[color]) { this.setState({ lanterns: { ...this.state.lanterns, [color]: (this.state.lanterns[color] || 0) + 1 } }) }
                }}
              >
          +
        </button>
              <LanternContainer>
                <Lantern color={color} count={this.state.lanterns[color] || 0} />
              </LanternContainer>
              <button
                onClick={() => {
                  if (this.state.lanterns[color] > 0) { this.setState({ lanterns: { ...this.state.lanterns, [color]: this.state.lanterns[color] - 1 } }) }
                }}
              >
          -
        </button>
            </Col>,
        )}
        </Row>
        <button
          onClick={() => {
            handleDiscard(this.state.lanterns)
          }}
        >Discard</button>
      </Col>
    )
  }
}

export default DiscardSelector
