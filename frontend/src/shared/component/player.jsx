import React from 'react'

import Tile from './tile'
import Lantern from './lantern'

type Props = {
player: {
},
selectedHandTileIdx: number,
selectedHandLantern: ?string,
selectHandTile: Function,
selectHandLantern: Function,
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
const Player = ({ player, selectedHandTileIdx, selectHandTile, selectedHandLantern, selectHandLantern }: Props) => <div>
  <h3>{player.name}</h3>
  {player.hand.map((tile, index) => <button
    style={{
      ...style,
      height: 100,
      width: 100,
      backgroundColor: selectedHandTileIdx === index ? 'yellow' : 'grey',
    }} onClick={() => {
      selectHandTile(index)
    }}
    key={tile.tileIdx}
  ><Tile tile={tile} size={100} /></button>,
  )}
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
      height: 70,
      width: 40,
      borderStyle: 'solid',
      borderColor: color === selectedHandLantern ? 'yellow' : 'black',
      border: 2,
    }}
    onClick={() => { selectHandLantern(color) }}
    key={color}
  >
    <Lantern color={color} count={player.lanterns[color]} />
  </button>,
  )}
  </div>
  <div>{player.favors} favors</div>
</div>

export default Player
