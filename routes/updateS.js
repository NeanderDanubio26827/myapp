var express = require('express');
var router = express.Router();


router.post('/:nomeCompleto/:apelido', async function (req, res, next) {
  let name = req.params.nomeCompleto;
  let nick = req.params.apelido;

  let nomeCompleto = req.body.nomeCompleto;
  let apelido = req.body.apelido;
  let idade = req.body.idade;
  let dataNascimento = req.body.dataNascimento;
  let sexo = req.body.sexo;
  let tatoo = req.body.tatoo;
  let genitora = req.body.genitora;
  let genitor = req.body.genitor;
  let faccoes = req.body.faccoes;
  let numero = req.body.numero;
  let rua = req.body.rua;
  let bairro = req.body.bairro;
  let local = req.body.local;

  let dados = {
    'nomeCompleto': nomeCompleto,
    'apelido': apelido,
    'idade': idade,
    'dataNascimento': dataNascimento,
    'sexo': sexo,
    'tatoo': tatoo,
    'genitora': genitora,
    'genitor': genitor,
    'faccoes': faccoes,
    'numero': numero,
    'rua': rua,
    'bairro': bairro,
    'local': local
  };

  console.table(dados);

  try {
    await fetch(`http://localhost:4000/updateS/${name}/${nick}`, {
      method: "PATCH",
      body: JSON.stringify(dados),
      headers: { "Content-Type": "application/json" },
    });
    res.redirect("/selectSusp"); // Redirecionar para a página desejada após o envio
  } catch (ex) {
    res.status(500).send({ erro: "deu erro!!" });
  }
});

module.exports = router;
