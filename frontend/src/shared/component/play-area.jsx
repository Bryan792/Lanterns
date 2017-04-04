import React from 'react'
import styled from 'styled-components'

import { SpacedRow } from './styled-flex'
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

  const Container = styled.div`
    width: 350px;
    border: 2px solid black;
  `

  const TileContainer = styled.button`
    width: 80px;
    height: 80px;
    margin: 20px;
    backgroundColor: {props => (props.selected) ? 'yellow' : 'grey')};
  `

  return (
    <Container>

      {/* Hand Tiles */}
      <SpacedRow>
        {player.hand.map((tile, index) =>
          <TileContainer
            selected={selectedHandTileIdx === index}
            onClick={() => {
              selectHandTile(index)
            }}
            key={tile.tileIdx}
          >
            <Rotater
              size={75} handleRotate={() => {
                rotateHandTile(tile.tileIdx)
              }}
            >
              <Tile tile={tile} size={75} numRotations={handRotations.get(tile.tileIdx) || 0} />
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
