var express = require('express');
const router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require("fs");

async function getFileAsByte(filepath) {
  const byte = Buffer.from(new Uint8Array( await fs.readFileSync(filepath)), 'base64');
  fs.unlinkSync(filepath);
  return byte;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(path.join(path.resolve(__dirname, "../public/uploads/")))
    cb(null, path.join(path.resolve(__dirname, "../public/uploads/")));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage});

router.post('/', upload.single("imagem"), async function(req, res, next) {
    let nome = req.body.nomeCompleto;
    let apelido = req.body.apelido;
    let idade = req.body.idade;
    let dataNascimento = req.body.dataNascimento;
    let sexo = req.body.sexo;
    let genitora = req.body.genitora;
    let genitor = req.body.genitor;
    let faccoes = req.body.faccoes;
    let numero = req.body.numero;
    let rua = req.body.rua;
    let bairro = req.body.bairro;
    let local = req.body.local;
    let tatoo = req.body.tatoo;
    let imagem = req.file;
    let image; 
    
    if (imagem) {
      // Se uma imagem foi fornecida, processa-a e converte para base64.
      let fileImage = await getFileAsByte(req.file.path);
      image = fileImage.toString('base64');
      //fs.unlinkSync(req.file.path); // Exclui o arquivo temporário depois de convertê-lo.
    }

    let dados = {
      'nomeCompleto': nome,
      'idade': idade,
      'dataNascimento': dataNascimento,
      'apelido': apelido,
      'sexo': sexo,
      'genitora': genitora,
      'genitor': genitor,
      'faccoes': faccoes,
      'numero': numero,
      'rua': rua,
      'bairro': bairro,
      'locals13': local,
      'tatoo': tatoo,
      'imagem': imagem,
      'image': image
  };
    dados = JSON.stringify(dados)
    //console.log(dados);
    try {
      await fetch("http://localhost:4000/insertS/", {
        method: "POST",
        body: dados,
        headers: { "Content-Type": "application/json" },
      });
      res.redirect("selectSusp");
    } catch (ex) {
        res.status(500).send({ erro: "deu erro!!" });

    }
  });

module.exports = router;
