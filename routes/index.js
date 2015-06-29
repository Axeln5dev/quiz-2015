var express = require('express');
var router = express.Router();

// Importamos el Controlador de quizes quizController
var quizController = require('../controllers/quizController');
// Importamos el Controlador de autores de la pagina
var authorController = require('../controllers/authorController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

// Definicion de rutas que manejara quizController
router.get('/question', quizController.question);
router.get('/answer', quizController.answer);

// Definicion de rutas que maneja los creadores de la pagina
router.get('/author', authorController.author);

module.exports = router;
