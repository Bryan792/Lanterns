const shuffle = require('lodash.shuffle');
const range = require('lodash.range');
const _ = require('lodash');

const COLOR_ORANGE = 'Orange';
const COLOR_GREEN = 'Green';
const COLOR_PURPLE = 'Purple';
const COLOR_WHITE = 'White';
const COLOR_BLUE = 'Blue';
const COLOR_RED = 'Red';
const COLOR_BLACK = 'Black';
const COLOR_ARRAY = [COLOR_ORANGE, COLOR_GREEN, COLOR_PURPLE, COLOR_WHITE, COLOR_BLUE, COLOR_RED, COLOR_BLACK];

const DIR_NORTH = 'North';
const DIR_EAST = 'East';
const DIR_SOUTH = 'South';
const DIR_WEST = 'West';
const DIR_ARRAY = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST];

function LanternsGame(players) {
  let game = {
    tiles: generateTiles(),
    tileOrder: _.take(shuffle(range(1, 37)), 20),
    grid: [
      {
        tileIdx: 0,
        x: 36,
        y: 36,
      }
    ],
    lanterns: {
      [COLOR_ORANGE]: 8,
      [COLOR_GREEN]: 8,
      [COLOR_PURPLE]: 8,
      [COLOR_WHITE]: 8,
      [COLOR_BLUE]: 8,
      [COLOR_RED]: 8,
      [COLOR_BLACK]: 8,
    },
    favors: 20,
    players: {},
    dedications: {
      uniques: [10, 9, 9, 8, 8, 7, 7, 6, 5],
      threePair: [9, 8, 8, 7, 7, 6, 6, 5, 5],
      fourOfAKind: [8, 7, 7, 6, 6, 5, 5, 5, 4],
      fours: [4, 4, 4],
    },
    stage: 'NEW_GAME',
    turn: '',
    turnStep: -1,
    placeTile: placeTile,
    tradeFavors: tradeFavors,
    buyDedication: buyDedication,
    discardLanterns: discardLanterns,
    printGrid: printGrid,
    getPlayerData: getPlayerData,
    addPlayer: addPlayer,
    startGame: startGame,
    skipTurnStep,
  }
  return game;

  function addPlayer(dir, name) {
    //TODO: check if spot exists
    game.players[dir] = generatePlayer(name);
  }

  function addPlayers(players) {
    //TODO: check if spot exists
    for (let dir in players) {
      game.players[dir] = generatePlayer(players[dir]);
    }
  }

  function startGame() {
    //Deal hands here maybe instead?

    //TODO: random
    game.stage = 'GAME'
    game.turn = DIR_NORTH;
    game.turnStep = -1;
    progressTurnStep(game.players[game.turn]);
  }

  function skipTurnStep(playerDir) {
    let player = game.players[playerDir];
    //Correct player?
    if (playerDir !== game.turn) {
      console.log('Wrong player');
      return;
    }
    if (game.turnStep < 2) {
      progressTurnStep(player)
    }
  }

  //TODO Rename and can be totally refactored
  function progressTurnStep(player) {
    game.turnStep += 1;
    let handCount = Object.keys(player.lanterns).reduce((previous, color) => previous + player.lanterns[color], 0);

    //TODO this could be refactored to not be recursive
    switch (game.turnStep) {
      case 0: {
        if (player.favors < 2) {
          progressTurnStep(player);
        }
        break;
      }
      case 1: {
        const lanterns = player.lanterns
        if (Object.keys(lanterns).every(color => lanterns[color] >= 1)) {
          break;
        }

        const threePairColors = Object.keys(lanterns).filter(color => lanterns[color] >= 2)
        if (threePairColors.length >= 3) {
          break;
        }

        const fourOfAKindColors = Object.keys(lanterns).filter(color => lanterns[color] >= 4)
        if (fourOfAKindColors.length > 0) {
          break;
        }
        progressTurnStep(player);
        break;
      }
      case 2: {
        if (handCount <= 12) {
          progressTurnStep(player);
        }
        break;
      }
      case 3:
        //TODO can this be done more elegantly?
        console.log(player.hand.length)
        if (player.hand.length === 0) {
          player.playedFinalTurn = true;
          if (Object.keys(game.players).every(dir => game.players[dir].playedFinalTurn)) {
            endGame();
          } else {
            progressTurn();
          }
        }
        break;
      default: {
        console.log(`ERROR: TurnStep weird number: ${game.turnStep}`);
        break;
      }
    }

  }

  function endGame() {
    game.stage = 'END_GAME';
    console.log('game ended')
  }

  function getRandColor() {
    let rand = Math.floor(Math.random() * COLOR_ARRAY.length)
    return COLOR_ARRAY[rand];
  }

  function getRandomTile() {
    return {
      [DIR_NORTH]: getRandColor(),
      [DIR_EAST]: getRandColor(),
      [DIR_SOUTH]: getRandColor(),
      [DIR_WEST]: getRandColor(),
      dragon: false,
    }
  }

  function generateTiles() {
    //generate 36 tiles
    let tiles = [
      {
        [DIR_NORTH]: getRandColor(),
        [DIR_EAST]: getRandColor(),
        [DIR_SOUTH]: getRandColor(),
        [DIR_WEST]: getRandColor(),
        dragon: false,
      }
    ];
    for (let i = 1; i < 37; i++) {
      tiles[i] = getRandomTile();
      if (i < 13) {
        tiles[i].dragon = true;
      }
    }
    return tiles;
  }

  function placeTile(playerDir, tileIdx, x, y, numRotations) {
    let player = game.players[playerDir];
    //Correct player?
    if (playerDir !== game.turn) {
      console.log('Wrong player');
      return;
    }
    //Correct turn?
    if (game.turnStep !== 3) {
      console.log('Player played this out of order');
      return;
    }
    //If player has more than 12 lanterns, he must discard to 12 first
    let handCount = Object.keys(player.lanterns).reduce((previous, color) => previous + player.lanterns[color], 0);
    if (handCount > 12) {
      console.log('Player must make a dedication or discard up to 12');
      return;
    }
    //check if tile is valid (not played before, owned by player)
    if (tileIdx > 36 || tileIdx < 1) {
      console.log('Tile not in valid range');
      return;
    }
    if (!player.hand.includes(tileIdx)) {
      console.log('Tile not in hand');
      return;
    }

    //check if numRotations is valid [0,3]
    if (!(numRotations >= 0) || !(numRotations <= 3)) {
      console.log('Rotations not between 0 and 3');
      return;
    }

    //check if position is valid
    let adjacent = {};
    let valid = true;
    let currentTile = game.tiles[tileIdx]
    game.grid.forEach(tile => {
      if (tile.x === x) {
        if (tile.y === y) {
          //same tile invalid
          valid = false;
        } else if (tile.y === y + 1) {
          adjacent[DIR_SOUTH] = tile;
        } else if (tile.y === y - 1) {
          adjacent[DIR_NORTH] = tile;
        }
      } else if (tile.y === y) {
        if (tile.x === x + 1) {
          adjacent[DIR_EAST] = tile;
        } else if (tile.x === x - 1) {
          adjacent[DIR_WEST] = tile;
        }
      }
    });

    if (valid === false || adjacent.length === 0) {
      console.log('Invalid');
      return;
    }

    //valid placement, lets rotate the tile permanently
    if (numRotations > 0) {
      let newTile = Object.assign({}, currentTile);
      for (let i = 0; i < DIR_ARRAY.length; i += 1) {
        newTile[DIR_ARRAY[i]] = currentTile[DIR_ARRAY[(i + (DIR_ARRAY.length - numRotations)) % DIR_ARRAY.length]];
      }
      currentTile = newTile;
      game.tiles[tileIdx] = newTile;
    }

    //check if matched, if so payout
    let favorGiven = false;
    for (let dir of DIR_ARRAY) {
      if (dir in adjacent) {
        let adjacentTile = game.tiles[adjacent[dir].tileIdx];
        let oppositeDir = DIR_ARRAY[(DIR_ARRAY.indexOf(dir) + 2) % DIR_ARRAY.length];
        if (adjacentTile[oppositeDir] === currentTile[dir]) { //matched
          giveLantern(playerDir, currentTile[dir]);
          //check dragon for currentTile
          //only 1 favor can be given for currentTile even if multiple matches
          if (!favorGiven && currentTile.dragon) {
            giveFavor(playerDir);
            favorGiven = true;
          }
          //check dragon for adjacentTile
          if (adjacentTile.dragon) {
            giveFavor(playerDir);
          }
        }
      }
    }

    //give lanterns for main card
    for (let dir in game.players) {
      giveLantern(dir, currentTile[dir]);
    }

    //add tile to played tiles
    game.grid.push({
      tileIdx: tileIdx,
      x: x,
      y: y,
    });

    //remove tile from player and give new tile
    if (game.tileOrder.length > 0) {
      player.hand.splice(player.hand.indexOf(tileIdx), 1, game.tileOrder.pop());
    } else {
      player.hand.splice(player.hand.indexOf(tileIdx), 1);
    }

    //progressTurn
    progressTurn();
  }

  function progressTurn() {
    let playerDirections = _.intersection(DIR_ARRAY, Object.keys(game.players));
    game.turn = playerDirections[(playerDirections.indexOf(game.turn) + 1) % playerDirections.length];
    game.turnStep = -1;
    progressTurnStep(game.players[game.turn])
    console.log('It is now ' + game.players[game.turn].name + ' turn');
  }

  function giveLantern(player, color) {
    if (game.lanterns[color] > 0) {
      game.players[player].lanterns[color]++;
      game.lanterns[color]--;
      console.log(game.players[player].name + ' got a ' + color + '. ' + JSON.stringify(game.players[player].lanterns) + ' ' + game.lanterns[color] + ' remain');
    }
  }

  function giveFavor(player) {
    if (game.favors > 0) {
      game.players[player].favors++;
      game.favors--;
      console.log(game.players[player].name + ' got a favor. ' + game.favors + ' remain');
    }
  }

  function tradeFavors(playerDir, giveColor, getColor) {
    let player = game.players[playerDir];
    //validate
    //Correct player?
    if (playerDir !== game.turn) {
      console.log('Wrong player');
      return;
    }
    //Correct turn?
    if (game.turnStep !== 0) {
      console.log('Player played this out of order');
      return;
    }
    //Does player have 2 favors?
    if (player.tokens < 2) {
      console.log('Less than 2 favors');
      return;
    }
    //Does player have giveColor?
    if (player.lanterns[giveColor] < 1) {
      console.log('Not enough to give');
      return;
    }
    //Are there any getColor left?
    if (game.lanterns[getColor] < 1) {
      console.log('Not enough to get');
      return;
    }

    player.favors -= 2;
    player.lanterns[giveColor]--;
    player.lanterns[getColor]++;
    game.favors += 2;
    game.lanterns[giveColor]++;
    game.lanterns[getColor]--;
    progressTurnStep(player)
    console.log(player.name + ' traded a ' + giveColor + ' for a ' + getColor);
  }

  function buyDedication(playerDir, dedicationType, lanterns) {
    let player = game.players[playerDir];
    //validate
    //Correct player?
    if (playerDir !== game.turn) {
      console.log('Wrong player');
      return;
    }
    //Correct turn?
    if (game.turnStep !== 1) {
      console.log('Player played this out of order');
      return;
    }
    //any dedicationType left?
    if (game.dedications[dedicationType].legnth === 0 && game.dedications['fours'].length === 0) {
      console.log('cannot buy anymore');
      return;
    }
    //player has specified lanterns?
    for (let color in lanterns) {
      if (lanterns[color] > player.lanterns[color]) {
        console.log('you do not have enough lanterns');
        return
      }
    }
    //lanterns match dedication type
    //TODO: can refactor
    if (dedicationType === 'uniques') {
      if (Object.keys(lanterns).length !== 7) {
        console.log('wrong number of lanterns given');
        return;
      }
      for (let color in lanterns) {
        //TODO: Check color names?
        if (lanterns[color] !== 1) {
          console.log('wrong number of lanterns given');
          return;
        }
      }
    } else if (dedicationType === 'threePair') {
      if (Object.keys(lanterns).length !== 3) {
        console.log('wrong number of lanterns given');
        return;
      }
      for (let color in lanterns) {
        //TODO: Check color names?
        if (lanterns[color] !== 2) {
          console.log('wrong number of lanterns given');
          return;
        }
      }
    } else if (dedicationType === 'fourOfAKind') {
      console.log(lanterns);
      if (Object.keys(lanterns).length !== 1) {
        console.log('wrong number of lanterns given');
        return;
      }
      for (let color in lanterns) {
        //TODO: Check color names?
        if (lanterns[color] !== 4) {
          console.log('wrong number of lanterns given');
          return;
        }
      }
    }

    //Valid
    let points = game.dedications[game.dedications[dedicationType].length !== 0 ? dedicationType : 'fours'].shift();
    player.points += points;
    console.log(player.name + ' gained ' + points + ' points');

    for (let color in lanterns) {
      let count = lanterns[color];
      player.lanterns[color] -= count;
      game.lanterns[color] += count;
    }
    progressTurnStep(player)
  }

  function discardLanterns(playerDir, lanterns) {
    console.log(JSON.stringify(lanterns));
    let player = game.players[playerDir];
    //validate
    //Correct player?
    if (playerDir !== game.turn) {
      console.log('Wrong player');
      return;
    }
    //Correct turn?
    if (game.turnStep !== 2) {
      console.log('Player played this out of order');
      return;
    }
    //player has specified lanterns?
    for (let color in lanterns) {
      if (lanterns[color] > player.lanterns[color]) {
        console.log('you do not have enough lanterns');
        return
      }
    }

    for (let color in lanterns) {
      game.lanterns[color] += lanterns[color];
      player.lanterns[color] -= lanterns[color];
    }

    //TODO HACKY
    game.turnStep--;
    progressTurnStep(player);
  }

  function generatePlayer(name) {
    return {
      name: name,
      lanterns: {
        [COLOR_ORANGE]: 0,
        [COLOR_GREEN]: 0,
        [COLOR_PURPLE]: 0,
        [COLOR_WHITE]: 0,
        [COLOR_BLUE]: 0,
        [COLOR_RED]: 0,
        [COLOR_BLACK]: 0,
      },
      hand: [game.tileOrder.pop(), game.tileOrder.pop(), game.tileOrder.pop()],
      favors: 0,
      points: 0,
    }
  }

  function printGrid() {
    for (let i = 0; i < 73; i++) {
      let row0 = '';
      let row1 = '';
      let row2 = '';
      for (let j = 0; j < 73; j++) {
        if (!game.grid.some(tile => {
            if (tile.x === i && tile.y === j) {
              row0 += ' ' + game.tiles[tile.tileIdx][DIR_NORTH][0] + ' '
              row1 += game.tiles[tile.tileIdx][DIR_WEST][0] + (game.tiles[tile.tileIdx].dragon ? 'D' : ' ') + game.tiles[tile.tileIdx][DIR_EAST][0];
              row2 += ' ' + game.tiles[tile.tileIdx][DIR_SOUTH][0] + ' '
              return true;
            }
            return false;
          })) {
          row0 += '   ';
          row1 += '   ';
          row2 += '   ';
        }
      }
      console.log(row0);
      console.log(row1);
      console.log(row2);
    }
  }

  function getPlayerData() {
    let allPlayerData = _.pick(game, ['lanterns', 'favors', 'dedications', 'turn', 'turnStep', 'stage']);
    allPlayerData.grid = game.grid.map(tile => Object.assign({}, game.tiles[tile.tileIdx], tile)
    );
    allPlayerData.players = _.mapValues(game.players, (player, dir) => {
      let playerData = _.pick(player, ['name', 'lanterns', 'favors', 'points']);
      playerData.hand = player.hand.map(tileIdx => Object.assign({
        tileIdx: tileIdx
      }, game.tiles[tileIdx]));
      return playerData;
    });
    return allPlayerData;
  }
}

module.exports = LanternsGame;
