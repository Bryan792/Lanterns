// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  loadGameAsync,
  selectGridLantern,
  selectDedication,
} from '../action/game'
import Game from '../component/game'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
  playerDir: state.game.get('playerDir'),
  selectedHandTile: state.game.get('selectedHandTile'),
  selectedGridLantern: state.game.get('selectedGridLantern'),
  selectedDedication: state.game.get('selectedDedication'),
})

const mapDispatchToProps = dispatch => ({
  loadGame: (gameId: string) => { dispatch(loadGameAsync(gameId)) },
  selectGridLantern: (color: string) => { dispatch(selectGridLantern(color)) },
  selectDedication: (type: string) => { dispatch(selectDedication(type)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
