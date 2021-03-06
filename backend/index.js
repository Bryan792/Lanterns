const LanternsGame = require('./LanternsGame');
const io = require('socket.io')();

let games = {};

io.on('connection', function(socket) {
  console.log('a user connected');
  let gameId;
  let playerDir;

  socket.on('id', function(id) {
    console.log(id);
    gameId = id;
    playerDir = '';
    if (!games[gameId]) {
      games[gameId] = LanternsGame();
    }
    socket.join(gameId);
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('player', function(player, fn) {
    console.log(player);
    if (playerDir) {
      console.log('already a dir ' + playerDir); 
      return;
    }
    //TODO check input
    let args = player.split(' ');
    playerDir = args[0];
    games[gameId].addPlayer(args[0], args[1]);
    //TODO Check for success
    fn('SUCCESS');
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('start', () => {
    console.log(`${gameId} starting`);
    games[gameId].startGame();
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('placeTile', ({tileIdx, x, y, numRotations}) => {
    console.log(playerDir);
    console.log(`${tileIdx} at ${x} ${y} with ${numRotations} cw rotations`)
    games[gameId].placeTile(playerDir, tileIdx, x, y, numRotations);
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('tradeFavors', ({giveColor, getColor}) => {
    console.log(playerDir);
    console.log(`${giveColor} for ${getColor}`);
    games[gameId].tradeFavors(playerDir, giveColor, getColor);
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('buyDedication', ({dedicationType, lanterns}) => {
    console.log(playerDir);
    console.log(`dedication`);
    games[gameId].buyDedication(playerDir, dedicationType, lanterns);
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('discardLanterns', (lanterns) => {
    console.log(playerDir);
    console.log(`discarding`);
    games[gameId].discardLanterns(playerDir, lanterns);
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('skipTurnStep', () => {
    console.log(playerDir);
    console.log(`skipping`);
    games[gameId].skipTurnStep(playerDir);
    io.to(gameId).emit('gameData', games[gameId].getPlayerData());
  });

});

io.listen(3000);
