// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  selectGridCoord,
  rotateHandTile,
} from '../action/game'
import Grid from '../component/grid'

const mapStateToProps = state => ({
  grid: state.game.get('gameData').grid,
  selectedGridCoord: state.game.get('selectedGridCoord'),
  // TODO FIXME where does this belong
  selectedHandTile: state.game.get('playerDir') && state.game.get('selectedHandTileIdx') > -1 && state.game.get('gameData') && state.game.get('gameData').players[state.game.get('playerDir')] ? state.game.get('gameData').players[state.game.get('playerDir')].hand[state.game.get('selectedHandTileIdx')] : undefined,
  handRotations: state.game.get('handRotations'),
})

const mapDispatchToProps = dispatch => ({
  selectGridCoord: (x, y) => { dispatch(selectGridCoord({ x, y })) },
  rotateHandTile: (index) => { dispatch(rotateHandTile(index)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
