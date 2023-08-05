var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
var logger = require('morgan');
var multer = require('multer');
var json = require('json');
var session = require('express-session');
var flash = require('flash');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'sua_chave_secreta';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth/users');
var loginRouter = require('./routes/auth/login');
var logoutRouter  = require('./routes/auth/logout');
var homeAcessRouter = require('./routes/homeAccess');
var ConectRouter = require('./routes/conect');
var insertSuspRouter = require('./routes/insertS');
var selectSuspRouter = require('./routes/selectSusp');
var insertVRouter = require('./routes/insertV');
var selectVRouter = require('./routes/selectV');
var updateVRouter = require('./routes/updateV');
var updateSRouter = require('./routes/updateS');
var formVRouter = require('./routes/form_insertV');
var formSRouter = require('./routes/form_insertS');
var selectVOneRouter = require('./routes/selectVOne');
var selectSOneRouter = require('./routes/selectSOne');
var imageVRouter = require('./routes/selectImageV');
var imageSRouter = require('./routes/selectImageS');

const { DATE } = require('sequelize');

var app = express();
//var upload = multer()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Middleware para verificar a autenticação
function verifyJWT(req, res, next) {
  // Verificar se o token está presente nos cookies
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    // Verificar e decodificar o token
    const decodedToken = jwt.verify(token, secretKey);

    // Na prática, você pode usar o ID do usuário para obter mais informações do banco de dados
    const matricula = decodedToken.matricula;

    // Definir o ID do usuário no objeto de solicitação para uso em outras rotas, se necessário
    req.matricula = matricula;
    // Continue para a próxima rota
    next();
  } catch (err) {
    // Se o token não for válido, redirecionar para a página de login
    res.redirect('/login');
  }
}

app.use('/', indexRouter);
app.use('/homeAccess', verifyJWT, homeAcessRouter);
app.use('/users', verifyJWT, usersRouter);
app.use('/login', loginRouter);
app.use('/logout', verifyJWT, logoutRouter);
app.use('/insertS', verifyJWT, insertSuspRouter);
app.use('/selectSusp', verifyJWT, selectSuspRouter);
app.use('/insertV', verifyJWT, insertVRouter);
app.use('/selectV', verifyJWT, selectVRouter);
app.use('/form_insertV', verifyJWT, formVRouter);
app.use('/form_insertS', verifyJWT, formSRouter);
app.use('/updateV', verifyJWT, updateVRouter);
app.use('/updateS', verifyJWT, updateSRouter);
app.use('/selectVOne', verifyJWT, selectVOneRouter);
app.use('/selectSOne', verifyJWT, selectSOneRouter);
app.use('/selectImageV', verifyJWT, imageVRouter);
app.use('/selectImageS', verifyJWT, imageSRouter);
app.use('/conect',ConectRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3000; 

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

module.exports = app;
