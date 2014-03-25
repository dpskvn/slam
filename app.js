var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    configFile = fs.readFileSync('./config.json', 'utf-8'),
    config = JSON.parse(configFile),
    shortid = require('shortid'),
    removeElement = require('./lib/arrayremove'),
    availableGames = [];

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

io.sockets.on('connection', function (socket) {
  socket.broadcast.emit('mobileconnected');
  socket.on('subscribe', function(room) {
    socket.join(room);
    console.log(room);
  });
  socket.on('coordinates', function (data) {
    io.sockets.in(data.room).emit('coordinates', data);
    //socket.broadcast.emit('coordinates', data);
  });
});

app.get('/:id?', function(req, res) {
  if (!req.params.id || availableGames.indexOf(req.params.id) === -1) {
    var idGen = shortid.generate();
    res.redirect('/' + idGen);
    availableGames.push(idGen);
  } else {
    res.render('index', { title: config.name });
  }
});

app.get('/:id/mobile', function(req, res) {
  if (availableGames.indexOf(req.params.id) === -1) {
    res.render('mobile', { title: config.name, wrongId: true });
  } else {
    res.render('mobile', { title: config.name, wrongId: false });
  }
});

console.log('✔ ' + config.name + ' is now listening on port ' + config.port + '...');
server.listen(process.env.PORT || config.port);