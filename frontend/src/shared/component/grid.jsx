import React from 'react'
import styled from 'styled-components'

import { Col } from './styled-flex'
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

    const Cell = styled.div`
      height: 50px;
      width: 50px;
      text-align: center;
    `

    const SelectedCell = styled(Cell)`
      background-color: yellow;
    `

    const AdjacentCell = styled(Cell)`
      border: 2px dashed;
    `

    const EmptyCell = styled(Cell)`
      visibility: hidden;
    `

    const RotatedGrid = styled.div`
      display: flex;
      align-items: center;
      transform: rotate(-45deg);
    `

    // TODO evaluate changing to all relative positions
    const column = []
    for (let x = minX; x <= maxX; x += 1) {
      const row = []
      for (let y = minY; y <= maxY; y += 1) {
        let adjacent
        const tileMatched = grid.some((tile) => {
          if (tile.x === x) {
            if (tile.y === y) {
              row.push(<Cell key={`${x} ${y}`}><Tile tile={tile} size={50} numRotations={0} /></Cell>)
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
              row.push(<SelectedCell key={`${x} ${y}`}>
                <Rotater size={50} handleRotate={() => rotateHandTile(selectedHandTile.tileIdx)}>
                  <Tile tile={selectedHandTile} size={50} numRotations={handRotations.get(selectedHandTile.tileIdx) || 0} />
                </Rotater>
              </SelectedCell>)
            } else {
              row.push(<AdjacentCell
                size={50} key={`${x} ${y}`} onClick={() => {
                  selectGridCoord(x, y)
                }}
              />)
            }
          } else {
            row.push(<EmptyCell key={`${x} ${y}`} />)
          }
        }
      }
      column.push(<Col
        key={x}
      >{row}</Col>)
    }
    return (
      <RotatedGrid>
        {column}
      </RotatedGrid>
    )
  }
}

export default Grid
