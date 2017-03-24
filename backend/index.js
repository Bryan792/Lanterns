const LanternsGame = require('./LanternsGame');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('HI');
});

let games = {};

app.get('/:id', function(req, res){
  let id = req.params.id;
  if (!games[id]) {
    games[id] = LanternsGame({North: "bryan792n", South: "bryan792s"});
  }
  res.send(games[id]);
  console.log(JSON.stringify(games[id].getPlayerData('North')));
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
