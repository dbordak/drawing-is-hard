var express = require('express');
var app = express();
app.use(express.static(__dirname)); //TODO move static assets to a public directory
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
