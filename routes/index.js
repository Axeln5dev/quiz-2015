var express = require('express');
var router = express.Router();

// Importamos el Controlador de quizes quizController
var quizController = require('../controllers/quizController');
// Importamos el Controlador de autores de la pagina
var authorController = require('../controllers/authorController');
// Importamos el Controlador de comentarios de la pagina
var commentController = require('../controllers/commentController');
// controller de session
var sessionController = require('../controllers/sessionController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    errors: []
  });
});

router.param('quizId', quizController.load); // Autoload
router.param('commentId', commentController.load); // Autoload

// Definicion de las rutas para el manejador de sesiones
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definicion de rutas que manejara quizController
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                 sessionController.loginRequired, quizController.new);
router.post('/quizes/create',             sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',       sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',    sessionController.loginRequired, quizController.destroy);

// Definimos las rutas para gestionar comentarios a las preguntas
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId/publish',  sessionController.loginRequired, commentController.publish);

// Definicion de rutas que maneja los creadores de la pagina
router.get('/author', authorController.author);

module.exports = router;
