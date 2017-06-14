module.exports = function () {
  var net = require('net');
  var JsonSocket = require('json-socket');

  const port = 52273;
  const host = '127.0.0.1';

  var socket = new JsonSocket(new net.Socket());
  socket.connect(port, host);
  socket.on('connect', function () {
    console.log('connect to ' + port + ' port');
  });
  return socket;
}
