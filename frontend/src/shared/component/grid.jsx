import React from 'react'

import Tile from './tile'
import Rotater from './rotater'

class Grid extends React.Component {

  props: {
  grid: [],
  selectedHandTile: ?{},
  selectedGridCoord: ?{},
  selectGridCoord: Function,
  handRotations: {},
  rotateHandTile: Function,
  }

  render() {
    const { grid, selectedHandTile, selectedGridCoord, selectGridCoord, handRotations, rotateHandTile } = this.props
    // inefficient?
    const minX = grid.map(tile => tile.x).reduce((a, b) => Math.min(a, b)) - 1
    const maxX = grid.map(tile => tile.x).reduce((a, b) => Math.max(a, b)) + 1
    const minY = grid.map(tile => tile.y).reduce((a, b) => Math.min(a, b)) - 1
    const maxY = grid.map(tile => tile.y).reduce((a, b) => Math.max(a, b)) + 1
    // const width = (maxX - minX) + 1
    // const height = (maxY - minY) + 1

    const style = {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      border: 0,
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      height: 50,
      width: 50,
    }

    // TODO evaluate changing to all relative positions
    const column = []
    for (let x = minX; x <= maxX; x += 1) {
      const row = []
      for (let y = minY; y <= maxY; y += 1) {
        let adjacent
        const tileMatched = grid.some((tile) => {
          if (tile.x === x) {
            if (tile.y === y) {
              row.push(<div style={style} key={`${x} ${y}`}><Tile tile={tile} size={50} numRotations={0} /></div>)
              return true
            }
            if (!adjacent) {
              if (tile.y === y + 1) {
                adjacent = true
              } else if (tile.y === y - 1) {
                adjacent = true
              }
            }
          } else if (!adjacent && tile.y === y) {
            if (tile.x === x + 1) {
              adjacent = true
            } else if (tile.x === x - 1) {
              adjacent = true
            }
          }
          return false
        })
        if (!tileMatched) {
          if (adjacent) {
            if (selectedHandTile && selectedGridCoord && x === selectedGridCoord.x && y === selectedGridCoord.y) {
              row.push(<div
                style={{
                  ...style,
                  backgroundColor: 'yellow',
                }} key={`${x} ${y}`}
              ><Rotater size={50} handleRotate={() => rotateHandTile(selectedHandTile.tileIdx)}>
                <Tile tile={selectedHandTile} size={50} numRotations={handRotations.get(selectedHandTile.tileIdx) || 0} />
              </Rotater>
              </div>)
            } else {
              row.push(<button
                style={{
                  ...style,
                  borderStyle: 'dashed',
                  border: 2,
                }} size={50} key={`${x} ${y}`} onClick={() => {
                  selectGridCoord(x, y)
                }}
              />)
            }
          } else {
            row.push(<div style={style} size={50} key={`${x} ${y}`} />)
          }
        }
      }
      column.push(<div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        key={x}
      >{row}</div>)
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          transform: 'rotate(-45deg)',
          overflow: 'hidden',
        }}
      >
        {column}
      </div>
    )
  }
}

export default Grid
