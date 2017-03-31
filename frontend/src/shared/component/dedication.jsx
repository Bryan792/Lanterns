import React from 'react'

type Props = {
  type: string,
  points: number,
}

const Dedication = ({ points, type }: Props) => {
  const style = {
    boxSizing: 'border-box',
    height: 100,
    width: 75,
    border: 2,
  }

  return (
    <div style={style}>
      <div>{points}</div>
      <div>{type}</div>
    </div>
  )
}

export default Dedication
