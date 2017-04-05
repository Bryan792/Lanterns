// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  selectHandTile,
  selectHandLantern,
  rotateHandTile,
  placeTile,
  tradeFavors,
  buyDedication,
  discardLanterns,
  skipTurnStep,
} from '../action/game'
import PlayArea from '../component/play-area'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
  selectedHandTileIdx: state.game.get('selectedHandTileIdx'),
  selectedHandLantern: state.game.get('selectedHandLantern'),
})

const mapDispatchToProps = dispatch => ({
  selectHandTile: (index) => { dispatch(selectHandTile(index)) },
  selectHandLantern: (color) => { dispatch(selectHandLantern(color)) },
  rotateHandTile: (index) => { dispatch(rotateHandTile(index)) },
  placeTile: () => { dispatch(placeTile()) },
  tradeFavors: () => { dispatch(tradeFavors()) },
  buyDedication: (type, lanterns) => { dispatch(buyDedication(type, lanterns)) },
  discardLanterns: (lanterns) => { dispatch(discardLanterns(lanterns)) },
  skipTurnStep: () => { dispatch(skipTurnStep()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayArea)
