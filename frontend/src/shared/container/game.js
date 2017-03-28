// TODO: Fix flow annotations
import { connect } from 'react-redux'

import { loadGameAsync, addPlayer } from '../action/game'
import Game from '../component/game'

const mapStateToProps = state => ({
  gameData: state.game.get('gameData'),
})

const mapDispatchToProps = dispatch => ({
  loadGame: (gameId: string) => { dispatch(loadGameAsync(gameId)) },
  addPlayer: (direction: string, name: string) => { dispatch(addPlayer(direction, name)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
