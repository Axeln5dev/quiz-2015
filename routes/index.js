var express = require('express');
var router = express.Router();

// Importamos el Controlador de quizes quizController
var quizController = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz 2015' });
});

// Definicion de rutas que manejara quizController
router.get('/question', quizController.question);
router.get('/answer', quizController.answer);

module.exports = router;
