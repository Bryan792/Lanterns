import React from 'react'
import styled from 'styled-components'

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'
// eslint-disable-next-line no-unused-vars
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST]

const Positioner = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

const RotateButton = styled.button`
  position: absolute;
  top: ${props => (props.size / 2) - (props.size / 6)}px;
  left: ${props => (1.1 * props.size)}px;
  height: ${props => (props.size / 3)}px;
  width: ${props => (props.size / 3)}px;
  background-color: grey;
  z-index: 1;
  visibility: ${props => (props.visibility)};
`


class Rotater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: 'hidden',
      timeout: -1,
    }
  }

  state: {
    visibility: string,
    timeout: number,
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  props: {
    size: number,
    children: {},
    handleRotate: Function,
  }

  render() {
    const { size, children, handleRotate } = this.props

    return (
      <Positioner
        onMouseEnter={() => {
          clearTimeout(this.state.timeout)
          this.setState({
            visibility: 'visible',
          })
        }}
        onMouseLeave={() => {
          this.setState({
            timeout: setTimeout(() => {
              this.setState({
                visibility: 'hidden',
              })
            }
            , 1000),
          })
        }}
      >
        <RotateButton
          size={size}
          visibility={this.state.visibility}
          onClick={() => {
            handleRotate()
          }}
        >⤸</RotateButton>
        {children}
      </Positioner>
    )
  }
}

export default Rotater
