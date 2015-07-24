var express = require('express');
var router = express.Router();

// Importamos el Controlador de quizes quizController
var quizController = require('../controllers/quizController');
// Importamos el Controlador de autores de la pagina
var authorController = require('../controllers/authorController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    errors: []
  });
});

router.param('quizId', quizController.load); // Autoload

// Definicion de rutas que manejara quizController
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

// Definicion de rutas que maneja los creadores de la pagina
router.get('/author', authorController.author);

module.exports = router;
