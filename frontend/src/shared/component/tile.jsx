import React from 'react'
import styled from 'styled-components'

type Props = {
tile: {
  tileIdx: number,
  dragon: boolean,
},
  handRotations: {
    get: Function,
  },
}

const DIR_NORTH = 'North'
const DIR_EAST = 'East'
const DIR_SOUTH = 'South'
const DIR_WEST = 'West'
// eslint-disable-next-line no-unused-vars
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST]

const ColoredTile = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: ${props => props.size / 4}px;
    border-color: ${props => `${props.tile.North} ${props.tile.East} ${props.tile.South} ${props.tile.West}`};
    transition: transform 250ms linear;
    transform: rotate(${props => props.rotation}deg);
    background-color: ${props => (props.selected ? 'yellow' : 'grey')};
    font-size: ${props => props.size / 4}px;
  `

const Tile = (props: Props) =>
  <ColoredTile {...props} rotation={(props.handRotations.get(props.tile.tileIdx) || 0) * 90}>{props.tile.dragon && 'D'}</ColoredTile>

export default Tile
