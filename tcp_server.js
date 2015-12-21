'use strict';
var net = require('net');
var fs = require('fs');

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    console.log('socket connection made');
    var dataString = data.toString();
    var writeStream = fs.createWriteStream(__dirname + '/files/' + Date.now() + '.txt');
    writeStream.write(dataString);
    writeStream.end();
    socket.end();
  });

  socket.on('end', function() {
    console.log('socket connection closed');
  });
});

server.listen('3000', function() {
  console.log('server listening on port 3000');
});

module.exports = server;
