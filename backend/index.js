const LanternsGame = require('./LanternsGame');
const io = require('socket.io')();

let games = {};

/*
app.get('/:id', function(req, res) {
  let id = req.params.id;
  if (!games[id]) {
    games[id] = LanternsGame({
      North: "bryan792n",
      South: "bryan792s"
    });
  }
  res.send(games[id]);
  console.log(JSON.stringify(games[id].getPlayerData('North')));
});
*/

io.on('connection', function(socket) {
  console.log('a user connected');
  let gameId;
  let playerDir;

  socket.on('id', function(id) {
    console.log(id);
    gameId = id;
    if (!games[gameId]) {
      games[gameId] = LanternsGame();
    }
    socket.emit('gameData', games[gameId].getPlayerData());
  });

  socket.on('player', function(player) {
    console.log(player);
    //TODO check input
    let args = player.split(' ');
    playerDir = args[0];
    games[gameId].addPlayer(args[0], args[1]);
    socket.emit('gameData', games[gameId].getPlayerData(playerDir));
  });

});

io.listen(3000);
