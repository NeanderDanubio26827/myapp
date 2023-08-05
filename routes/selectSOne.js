var express = require('express');
var router = express.Router();

async function getS() {
    try {
      const response = await fetch("http://localhost:4000/selectSusp/");
      if (response.status === 200) {
        const json = await response.json();
        //console.log(json);
        return json;
      } else {
        throw "Deu erro!!";
      }
    } catch (ex) {
      throw ex;
    }
  }  

router.get('/:nome/:apelido', async function (req, res, next) { 
    let nome = req.params.nome;
    let apelido = req.params.apelido;

    const suspeitos = await getS();
    const susp = suspeitos.find((susp) => susp.nomeCompleto === nome && susp.apelido === apelido);
    //console.log(s);
    try {
        res.render('form_updateS', { dadoS: susp , isAuthenticated: req.cookies.token ? true : false });

    }catch (err) {
        res.status(500).send({ err: 'deu erro!!' })
    }
    
})

module.exports = router;