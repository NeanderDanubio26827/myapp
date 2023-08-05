var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form_insertS', { isAuthenticated: req.cookies.token ? true : false });
});

module.exports = router;
