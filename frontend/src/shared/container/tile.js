// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
} from '../action/game'
import Tile from '../component/tile'

const mapStateToProps = state => ({
  handRotations: state.game.get('handRotations'),
})

export default connect(mapStateToProps)(Tile)
