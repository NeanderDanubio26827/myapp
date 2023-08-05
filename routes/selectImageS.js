const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

async function getFileAsByte2(filepaths) {
  try {
    const bytesArray = await Promise.all(
      filepaths.map(async (filepath) => {
        const bytes = await fs.promises.readFile(filepath);
        return bytes;
      })
    );

    return bytesArray;
  } catch (err) {
    console.error('Erro ao ler os arquivos:', err);
    throw err;
  }
}

router.get('/:nome/:apelido', async function (req, res, next) {
  const nome = req.params.nome;
  const apelido = req.params.apelido;

  // Construindo a URL da API para obter os caminhos das imagens com base na 'placa'
  const apiUrl = `http://localhost:4000/selectImageS/${nome}/${apelido}`;

  try {
    // Fazendo a requisição à API usando o fetch
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const filepaths = await response.json();

      // Obtendo os bytes das imagen
      //const bytesArray = await getFileAsByte2(filepaths);

      // Convertendo os bytes para base64
      //const imagensBase64 = bytesArray.map((bytes) => bytes.toString('base64'));

      // Renderizar a view com as imagens em base64
      res.render('imagesS', { imagensS: filepaths, isAuthenticated: req.cookies.token ? true : false }); // 'sua_view' é o nome da view que exibirá as imagens
    } else {
      throw "Deu erro na chamada à API!!";
    }
  } catch (ex) {
    console.error('Erro ao processar as imagens:', ex);
    res.sendStatus(500); // Retornar status 500 (Internal Server Error) em caso de erro
  }
});
module.exports = router; 