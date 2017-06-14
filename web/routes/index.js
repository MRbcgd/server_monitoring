var express = require('express');
var router = express.Router();
var JsonSocket = require('json-socket');
var net = require('net');

var sock = require('../socket.js');

const port = 52273;
const host = '127.0.0.1';

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.redirect('/main')
  } else {
    res.render('index.ejs', {
    });
  }
});
router.post('/signin', function(req, res, next) {

  var user = {
    username : req.body.username,
    password : req.body.password
  };

  if ( user.username !== 'test' && user.password !== 'test') {
    req.session.username = user.username;
    req.session.login_token = 'test';//추후변경

    res.redirect('/main');
  } else {
    res.redirect('/');
  }

});
router.get('/signout', function(req, res, next) {
  if( req.session.username ) {
    req.session.destroy(function(err){
     if (err) {
       throw err;
     }
     res.redirect('/')
   });
 } else {
   res.redirect('/main')
 }
});
router.get('/main', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('main.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
//system information
router.get('/stat_info', function(req, res, next) {
  var socket = sock();
  var sess = req.session;
  var packet = {
    head :{}
  };

  if (sess.username) {

    socket.on('connect', function () {
      packet.head.svccd = 'stat_info';

      socket.sendMessage(packet, function () {
        console.log('sending packet to master server..');
      });

      socket.on('message', function (message) {
        res.render('stat_info.ejs', {
          username: sess.username,
          data : message
        });
      });

    });
  } else {
    res.redirect('/');
  }
});
router.get('/usage_status', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('usage_status.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/usage_cpu', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('usage_cpu.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/stat_prcs', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('stat_prcs.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/usage_mem', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('usage_mem.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/usage_tcp', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('usage_tcp.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/stat_net', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('stat_net.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/stat_ipcq', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('stat_ipcq.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/stat_ipcm', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('stat_ipcm.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/usage_disk', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('usage_disk.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
router.get('/stat_disk', function(req, res, next) {
  var sess = req.session;

  if (sess.username) {
    res.render('stat_disk.ejs', {
      username: sess.username
    });
  } else {
    res.redirect('/');
  }
});
module.exports = router;
