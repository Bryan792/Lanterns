// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
} from '../action/game'
import Dedication from '../component/dedication'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
})

export default connect(mapStateToProps)(Dedication)
