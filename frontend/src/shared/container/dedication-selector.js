// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  buyDedication,
  skipTurnStep,
} from '../action/game'
import DedicationSelector from '../component/dedication-selector'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
  playerDir: state.game.get('playerDir'),
})

const mapDispatchToProps = dispatch => ({
  buyDedication: (type, lanterns) => { dispatch(buyDedication(type, lanterns)) },
  skipTurnStep: () => { dispatch(skipTurnStep()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(DedicationSelector)
