var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('homeAccess', { isAuthenticated: req.cookies.token ? true : false });
});

module.exports = router;
