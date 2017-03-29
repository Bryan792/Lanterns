import React from 'react'

type Props = {
  card: {
  }
}

const Card = ({ card }: Props) => {
  const style = {
    height: 25,
    width: 25,
    borderStyle: 'solid',
    borderWidth: 25,
    borderColor: `${card.North} ${card.East} ${card.South} ${card.West}`,
    backgroundColor: 'grey',
    display: 'inline-block',
    margin: '1px',
  }

  return (
    <div style={style} />
  )
}

export default Card
