import React from 'react'

import Card from './card'

type Props = {
  player: {
  }
}

const Player = ({ player }: Props) =>
  <div>
    <h3>{player.name}</h3>
    {player.hand.map(card =>
      <Card card={card} />,
    )}
  </div>

export default Player
