import React from 'react'

import Tile from './tile'
import Lantern from './lantern'

type Props = {
player: {
},
selectedHandTileIdx: number,
selectHandTile: Function,
}

// TODO: button here?
const Player = ({ player, selectedHandTileIdx, selectHandTile }: Props) => <div>
  <h3>{player.name}</h3>
  {player.hand.map((tile, index) => <button
    style={{
      height: 100,
      width: 100,
      border: 0,
      padding: 0,
      backgroundColor: selectedHandTileIdx === index ? 'yellow' : 'grey',
    }} onClick={() => {
      selectHandTile(index)
    }}
  ><Tile tile={tile} size={100} /></button>,
  )}
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    {
  Object.keys(player.lanterns).sort((color1, color2) => player.lanterns[color2] - player.lanterns[color1]).map(color => <div
    style={{
      boxSizing: 'border-box',
      height: 70,
      width: 40,
      borderStyle: 'solid',
      borderColor: 'black',
    }}
  >
    <Lantern color={color} count={player.lanterns[color]} />
  </div>,
  )}
  </div>
  <div>{player.favors} favors</div>
</div>

export default Player
