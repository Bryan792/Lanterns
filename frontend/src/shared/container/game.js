// TODO: Fix flow annotations
import { connect } from 'react-redux'

import {
  loadGameAsync,
  addPlayer,
  startGame,
  placeTile,
  selectGridLantern,
  tradeFavors,
  selectDedication,
  buyDedication,
  discardLanterns,
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
  addPlayer: (direction: string, name: string) => { dispatch(addPlayer(direction, name)) },
  startGame: () => { dispatch(startGame()) },
  placeTile: () => { dispatch(placeTile()) },
  selectGridLantern: (color: string) => { dispatch(selectGridLantern(color)) },
  tradeFavors: () => { dispatch(tradeFavors()) },
  selectDedication: (type: string) => { dispatch(selectDedication(type)) },
  buyDedication: (type, lanterns) => { dispatch(buyDedication(type, lanterns)) },
  discardLanterns: (lanterns) => { dispatch(discardLanterns(lanterns)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
