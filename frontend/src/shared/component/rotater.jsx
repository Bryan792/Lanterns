import React from 'react'

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'
// eslint-disable-next-line no-unused-vars
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST]

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
    const style = {
      boxSizing: 'border-box',
      height: '100%',
      width: '100%',
      position: 'relative',
    }

    const { size, children, handleRotate } = this.props

    return (
      <div
        style={style}
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
        <button
          style={{
            position: 'absolute',
            top: (size / 2) - (size / 8),
            left: size,
            width: size / 4,
            height: size / 4,
            backgroundColor: 'grey',
            zIndex: 1,
            visibility: this.state.visibility,
          }}
          onClick={() => {
            handleRotate()
          }}
        >⤸</button>
        {children}
      </div>
    )
  }
}

export default Rotater
