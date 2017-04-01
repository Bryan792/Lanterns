// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  addPlayer,
  startGame,
} from '../action/game'
import Lobby from '../component/lobby'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
  playerDir: state.game.get('playerDir'),
})

const mapDispatchToProps = dispatch => ({
  addPlayer: (direction: string, name: string) => { dispatch(addPlayer(direction, name)) },
  startGame: () => { dispatch(startGame()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
