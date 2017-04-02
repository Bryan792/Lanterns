import React from 'react'

import Lantern from './lantern'

type Props = {
player: {
},
selectedHandLantern: ?string,
selectHandLantern: Function,
handRotations: {},
}

const style = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  WebkitAppearance: 'none',
  MozAppearance: 'none',
}

// TODO: button here? check keys
const Player = ({ player, selectedHandLantern, selectHandLantern }: Props) =>
  <div>
    <h3>{player.name}</h3>

    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {
  Object.keys(player.lanterns).sort((color1, color2) => player.lanterns[color2] - player.lanterns[color1]).map(color => <button
    style={{
      ...style,
      height: 50,
      width: 30,
      borderStyle: 'solid',
      borderColor: color === selectedHandLantern ? 'yellow' : 'black',
      border: 2,
    }}
    onClick={() => {
      selectHandLantern(color)
    }}
    key={color}
  >
    <Lantern color={color} count={player.lanterns[color]} />
  </button>,
  )}
    </div>
    <div>{player.favors} favors</div>
    <div>{player.points} points</div>
  </div>

export default Player
