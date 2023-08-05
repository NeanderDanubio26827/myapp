var express = require('express');
var router = express.Router();

// Rota para fazer o log out
router.get('/', function(req, res, next) {
 // Limpar o cookie de token, definindo seu valor para vazio e a data de expiração para o passado
 res.cookie('token', '', { expires: new Date(0), httpOnly: true });

 // Redirecionar para a página de login após o logout
 res.redirect('/login');
});

module.exports = router;
