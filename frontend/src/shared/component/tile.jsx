import React from 'react'

type Props = {
  tile: {
  },
  size: number,
}

const Tile = ({ tile, size }: Props) => {
  const style = {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: size / 4,
    borderColor: `${tile.North} ${tile.East} ${tile.South} ${tile.West}`,
  }

  return (
    <div style={style} />
  )
}

export default Tile
