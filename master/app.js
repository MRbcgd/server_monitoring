var express = require('express');
var net = require('net');
var JsonSocket = require('json-socket');
var ip = require('ip');
var session = require('express-session');
var conn = require('./db.js');

const port = 52273;
const host = '127.0.0.1';

var packet = {};

var app = express();
var server = net.createServer();

app.use(session({
  secret: '7?z-qddk-l-45',
  resave: false,
  saveUninitialized: true
}));

var func = require('./func.js');

//main
server.listen(port, function () {
  console.log('server Running at ' + port +' port');

  //check ip
  if ( !func.ip_chk(ip.address()) ) {
    console.log('incorrect ip*****');

    server.close();
  };

  session.svrkey = 'test';//for crud
  
  // func.usage_disk();
  server.on('connection', function (socket) {
    socket = new JsonSocket(socket);

    socket.on('message', function (message) {
      //system information
      if ( message.head.svccd === 'stat_info' ) {
        packet = func.stat_info(func.cpu_info(), func.mem_info());

        socket.sendEndMessage(packet, function () {
          console.log('sending packet to web server..');
        });
      };

    });
  });
});
