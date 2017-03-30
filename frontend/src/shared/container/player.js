// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  selectHandTile,
} from '../action/game'
import Player from '../component/player'

const mapStateToProps = state => ({
  selectedHandTileIdx: state.game.get('selectedHandTileIdx'),
})

const mapDispatchToProps = dispatch => ({
  selectHandTile: (index) => { dispatch(selectHandTile(index)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
