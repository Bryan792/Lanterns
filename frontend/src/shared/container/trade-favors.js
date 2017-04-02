// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  tradeFavors,
  skipTurnStep,
} from '../action/game'
import TradeFavors from '../component/trade-favors'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
  playerDir: state.game.get('playerDir'),
})

const mapDispatchToProps = dispatch => ({
  tradeFavors: (giveColor, getColor) => { dispatch(tradeFavors(giveColor, getColor)) },
  skipTurnStep: () => { dispatch(skipTurnStep()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeFavors)
