import React from 'react'
import styled from 'styled-components'

import { SpacedRow } from './styled-flex'
import Tile from '../container/tile'
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
  rotateHandTile: Function,
  discardLanterns: Function,
  placeTile: Function,
  gameData: {},
}

const Container = styled.div`
    width: 350px;
    border: 2px solid black;
    border-radius: 5px;
  `

const TileContainer = styled.button`
    width: 80px;
    height: 80px;
    margin: 10px;
    background-color: white;
    border: 0;
  `

const PlayArea = ({ player, selectedHandTileIdx, selectHandTile, rotateHandTile, gameData, discardLanterns, placeTile }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const lanternsCount = Object.keys(player.lanterns).reduce((previous, color) => previous + player.lanterns[color], 0)

  return (
    <Container>

      {/* Hand Tiles */}
      <SpacedRow>
        {player.hand.map((tile, index) =>
          <TileContainer
            onClick={() => {
              selectHandTile(index)
            }}
            key={tile.tileIdx}
          >
            <Rotater
              size={80} handleRotate={() => {
                rotateHandTile(tile.tileIdx)
              }}
            >
              <Tile tile={tile} size={80} selected={selectedHandTileIdx === index} />
            </Rotater>
          </TileContainer>,
      )}
      </SpacedRow>

      {gameData.turnStep === 0 &&
      <TradeFavors />
      }

      {gameData.turnStep === 1 &&
      <DedicationSelector />
      }

      {gameData.turnStep === 2 &&
      <DiscardSelector lanterns={player.lanterns} handleDiscard={discardLanterns} />
      }

      {gameData.turnStep === 3 &&
      <Button label="Place Tile" handleClick={placeTile} />
      }

    </Container>
  )
}

export default PlayArea
