var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
      const response = await fetch('http://localhost:4000/selectU/');
      if (response.status === 200) {
        const json = await response.json();
        res.json(json); // Retorna o JSON com os usuários como resposta
      } else {
        throw "Deu erro!!";
      }
    } catch (ex) {
      res.status(500).send({ err: 'deu erro!!' });
    }
  });
  
  module.exports = router;