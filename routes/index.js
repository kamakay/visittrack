var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET alive page */
router.get('/alive', function(req, res, next) {
  res.send('NONE');
});

module.exports = router;
