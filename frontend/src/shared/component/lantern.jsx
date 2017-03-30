import React from 'react'

type Props = {
  color: string,
  count: number,
}

const Lantern = ({ color, count }: Props) => {
  const style = {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    backgroundColor: color,
  }

  return (
    <div style={style}>{count}</div>
  )
}

export default Lantern
