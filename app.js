var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    configFile = fs.readFileSync('./config.json', 'utf-8'),
    config = JSON.parse(configFile);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

io.sockets.on('connection', function (socket) {
    socket.broadcast.emit('mobileconnected');
    socket.on('coordinates', function (data) {
       socket.broadcast.emit('coordinates', data);
    });
});

app.get('/', function(req, res) {
  res.render('index', { title: config.name })
});

app.get('/mobile', function(req, res) {
  res.render('mobile', { title: config.name })
});

console.log('✔ ' + config.name + ' is now listening on port ' + config.port + '...');
server.listen(config.port);