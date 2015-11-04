var express = require('express');
var router = express.Router();
var url = require('url');

router.get('/pic.gif', function(req, res, next) {
  
  var buffer = new Buffer( [
    0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
    0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b
  ]);
  
  var request = url.parse(req.url, true);
  var action = request.pathname;
  
  //res.writeHead(200, {'Content-Type': 'image/gif'});
  //res.end(buffer, 'binary');
  //res.send(buffer, { 'Content-Type': 'image/gif' }, 200);
  var imgHex = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';
  var imgBinary = new Buffer(imgHex, 'hex');
  //res.writeHead(200, {'Content-Type': 'image/gif' });
  res.type('image/gif').cookie('7P', "12345", {path: "/" }).status(200);
  res.end(imgBinary, 'binary');
});

module.exports = router;
