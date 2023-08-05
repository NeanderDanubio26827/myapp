const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require("fs");

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

router.post("/", upload.single("imagem"), async function (req, res, next) {
  let modelo = req.body.modelo;
  let marca = req.body.marca;
  let placa = req.body.placa || ''; // Define uma string vazia como valor padrão caso a placa não seja fornecida.
  let chassi = req.body.chassi;
  let datas25 = req.body.datas25;
  let ocorrencia = req.body.ocorrencia;
  let local = req.body.local;
  let imagem = req.file;
  let image; // Define como null por padrão caso a imagem não seja fornecida.

  if (imagem) {
    // Se uma imagem foi fornecida, processa-a e converte para base64.
    let fileImage = await getFileAsByte(req.file.path);
    image = fileImage.toString('base64');
    //fs.unlinkSync(req.file.path); // Exclui o arquivo temporário depois de convertê-lo.
  }

  let dados = {
    'modelo': modelo,
    'marca': marca,
    'placa': placa,
    'chassi': chassi,
    'datas25': datas25,
    'imagem': imagem,
    'ocorrencia': ocorrencia,
    'locals13': local,
    'image': image,
  };
  
  dados = JSON.stringify(dados);
  //console.log(dados);

  try {
    await fetch("http://localhost:4000/insertV/", {
      method: "POST",
      body: dados,
      headers: { "Content-Type": "application/json" },
    });
    res.redirect("selectV");
  } catch (ex) {
    res.status(500).send({ erro: "deu erro!!" });
  }
});

module.exports = router;