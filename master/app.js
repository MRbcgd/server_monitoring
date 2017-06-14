var express = require('express');
var net = require('net');
var JsonSocket = require('json-socket');
var ip = require('ip');

const port = 52273;
const host = '127.0.0.1';

var packet = {};

var app = express();
var server = net.createServer();

var func = require('./func.js');

server.listen(port, function () {
  console.log('server Running at ' + port +' port');

  //check ip
  if ( !func.ip_chk(ip.address()) ) {
    console.log('incorrect ip*****');

    server.close();
  };
  //session svrkey

  server.on('connection', function (socket) {
    socket = new JsonSocket(socket);

    socket.on('message', function (message) {
      if ( message.head.svccd === 'stat_info' ) {
        packet = func.stat_info(func.cpu_info(), func.mem_info());

        socket.sendEndMessage(packet, function () {
          console.log('sending packet to web server..');
        });
      };
    });
  });
});
