import React from 'react'
import styled from 'styled-components'

type Props = {
tile: {
},
size: number,
numRotations: number,
}

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'
// eslint-disable-next-line no-unused-vars
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST]

const Tile = ({ tile, numRotations, size }: Props) => {
  const newTile = {}
  for (let i = 0; i < DIR_ARRAY.length; i += 1) {
    newTile[DIR_ARRAY[i]] = tile[DIR_ARRAY[(i + (DIR_ARRAY.length - numRotations)) % DIR_ARRAY.length]]
  }

  const ColoredTile = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: ${size / 4}px;
    border-color: ${newTile.North} ${newTile.East} ${newTile.South} ${newTile.West};
  `

  return (
    <ColoredTile>{tile.dragon && 'D'}</ColoredTile>
  )
}

export default Tile
