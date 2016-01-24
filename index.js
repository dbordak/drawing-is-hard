var express = require('express');
var app = express();
app.use(express.static(__dirname)); //TODO move static assets to a public directory
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var p2p = require('socket.io-p2p-server').Server;
// io.use(p2p);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

var getPrompts = function(number, callback) {
    // TODO: select > number randomly, then select top voted "number" from that
    db.all("SELECT prompt FROM prompts ORDER BY RANDOM() LIMIT ?", number, function(err, prompts) {
        callback(err, prompts);
    });
};

/** Gets name of monitor-specific room. */
var getMonitorRoom = function(code) {
    return code + '-monitors';
}

var getIds = function(code) {
    return Object.keys(io.nsps['/'].adapter.rooms[code].sockets);
}

var getMonitorIds = function(code) {
    return getIds(getMonitorRoom(code));
}

var getPlayerIds = function(code) {
    var monitorIds = getMonitorIds(code);
    return getIds(code).filter(function(x) {return monitorIds.indexOf(x) < 0;});
}

/** Gets number of monitors in a room. */
var getNumMonitors = function(code) {
    return getIds(getMonitorRoom(code)).length;
}

/** Gets number of clients (monitors and players) in a room. */
var getNumClients = function(code) {
    return getIds(code).length;
}

/** Gets number of players in a room. */
var getNumPlayers = function(code) {
    return getNumClients(code) - getNumMonitors(code);
}

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
        socket.join(getMonitorRoom(data.code));
    });

    socket.on('startGame', function(data) {
        console.log('Starting Game!');

        getPrompts(getNumPlayers(data.code), function(err, prompts) {
            console.log(prompts);
            // create object mapping id's to prompts
            var assignments = {};

            getPlayerIds(data.code).forEach(function(val, i) {
                assignments[val] = prompts[i];
            });

            console.log(assignments);

            io.to(data.code).emit('startGame', assignments);
        });
    });

    socket.on('drawing-submit', function(data) {
        console.log('drawing received');
        io.to(data.code).emit('drawing-submit', {
            id: socket.id,
            svg: data.svg,
            prompt: data.prompt
        });
    });

    socket.on('drawing-phase-complete', function(data) {
        console.log('drawing phase complete');
        io.to(data.code).emit('drawing-phase-complete');
    });

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
