import React from 'react'

import Tile from './tile'

class Grid extends React.Component {

  props: {
  grid: {},
  selectedHandTile: {},
  selectedGridCoord: {},
  selectGridCoord: Function,
  }

  render() {
    const { grid, selectedHandTile, selectedGridCoord, selectGridCoord } = this.props
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

    const column = []
    for (let x = minX; x <= maxX; x += 1) {
      const row = []
      for (let y = minY; y <= maxY; y += 1) {
        let adjacent
        const tileMatched = grid.some((tile) => {
          if (tile.x === x) {
            if (tile.y === y) {
              row.push(<div style={style} key={`${x} ${y}`}><Tile tile={tile} size={50} /></div>)
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
              ><Tile tile={selectedHandTile} size={50} /></div>)
            } else {
              row.push(<button
                style={{
                  ...style,
                  backgroundColor: 'grey',
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
      >{row}</div>)
    }
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        {column}
      </div>
    )
  }
}

export default Grid
