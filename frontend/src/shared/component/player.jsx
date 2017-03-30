import React from 'react'

import Tile from './tile'

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
</div>

export default Player
