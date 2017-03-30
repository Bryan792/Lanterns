// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  selectHandTile,
  selectHandLantern,
} from '../action/game'
import Player from '../component/player'

const mapStateToProps = state => ({
  selectedHandTileIdx: state.game.get('selectedHandTileIdx'),
  selectedHandLantern: state.game.get('selectedHandLantern'),
})

const mapDispatchToProps = dispatch => ({
  selectHandTile: (index) => { dispatch(selectHandTile(index)) },
  selectHandLantern: (color) => { dispatch(selectHandLantern(color)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
