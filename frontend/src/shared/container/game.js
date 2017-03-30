// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  loadGameAsync,
  addPlayer,
  startGame,
} from '../action/game'
import Game from '../component/game'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
  playerDir: state.game.get('playerDir'),
  selectedHandTile: state.game.get('selectedHandTile'),
})

const mapDispatchToProps = dispatch => ({
  loadGame: (gameId: string) => { dispatch(loadGameAsync(gameId)) },
  addPlayer: (direction: string, name: string) => { dispatch(addPlayer(direction, name)) },
  startGame: () => { dispatch(startGame()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
