import React from 'react'

import Tile from './tile'
import Rotater from './rotater'
import Button from './button'
import DiscardSelector from './discard-selector'
import TradeFavors from '../container/trade-favors'
import DedicationSelector from '../container/dedication-selector'

type Props = {
  player: {
  },
  selectedHandTileIdx: number,
  selectHandTile: Function,
  handRotations: {},
  rotateHandTile: Function,
  discardLanterns: Function,
  placeTile: Function,
  gameData: {},
}

const PlayArea = ({ player, selectedHandTileIdx, selectHandTile, rotateHandTile, handRotations, gameData, discardLanterns, placeTile }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const lanternsCount = Object.keys(player.lanterns).reduce((previous, color) => previous + player.lanterns[color], 0)

  return (
    <div
      style={{
        border: 2,
        borderColor: 'black',
        borderStyle: 'solid',
      }}
    >

      {/* Hand Tiles */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {player.hand.map((tile, index) =>
          <button
            style={{
              height: 50,
              width: 50,
              backgroundColor: selectedHandTileIdx === index ? 'yellow' : 'grey',
            }}
            onClick={() => {
              selectHandTile(index)
            }}
            key={tile.tileIdx}
          >
            <Rotater
              size={50} handleRotate={() => {
                rotateHandTile(tile.tileIdx)
              }}
            >
              <Tile tile={tile} size={50} numRotations={handRotations.get(tile.tileIdx) || 0} />
            </Rotater>
          </button>,
      )}
      </div>

      {gameData.turnStep === 0 &&
      <TradeFavors />
    }

      {/* gameData.turnStep <= 1 &&
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >

                  {
        ['uniques', 'threePair', 'fourOfAKind']
          .filter(type => gameData.dedications[type].length > 0,
        )
          .map(type => <div key={type}><Dedication points={gameData.dedications[type][0]} type={type} />
            {possibleDedications[type].length > 0 &&
            <DedicationSelector onDedicationSelected={buyDedication} type={type} possibleDedications={possibleDedications[type]} />}
          </div>)}
                </div>
                */}
      {gameData.turnStep === 1 &&
        <DedicationSelector />
    }

      {gameData.turnStep === 2 &&
      <DiscardSelector lanterns={player.lanterns} handleDiscard={discardLanterns} />
    }

      {gameData.turnStep === 3 &&
      <Button label="Place Tile" handleClick={placeTile} />
    }

    </div>
  )
}

export default PlayArea
