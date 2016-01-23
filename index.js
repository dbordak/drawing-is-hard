var express = require('express');
var app = express();
app.use(express.static(__dirname)); //TODO move static assets to a public directory
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var p2p = require('socket.io-p2p-server').Server;
// io.use(p2p);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected at socket %s', socket.id);

    socket.on('connAsPlayer', function(data) {
        console.log('Connecting as player %s to room %s.', data.name, data.code);
        socket.join(data.code);
        io.to(data.code).emit('player-joined', {name: data.name, id: data.id});
    });

    socket.on('connAsMonitor', function(data) {
        console.log('Connecting as monitor to room %s.', data.code);
        socket.join(data.code);
    });

    socket.on('startGame', function(data) {
        console.log('Starting Game!');
        io.to(data.code).emit('startGame');
    });

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
