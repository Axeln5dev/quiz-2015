var models = require('../models/models');

/*
 * Controlador para las peticiones relaciondas con las preguntas y respuestas del juego QUIZ 2015
 */

// Metodo manejador de la peticion GET '/quizes?search=texto_a_buscar'
exports.search = function(req, res) {
  var searchString = '%' + req.query.search.replace(' ', '%') + '%';
  console.log('searchString: ' + searchString);
  models.Quiz.findAll({ where: ["pregunta like ?", searchString] }).then(function(results) {
    console.log(JSON.stringify(results));
    res.render('quizes/question', {
      'quiz_question': results[0].pregunta
    });
  });
};

// Metodo manejador de la peticion GET '/quizes'
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(results) {
    res.render('quizes/index', {
      quizes: results
    });
  });
};

// Metodo manejador de la peticion GET '/quizes/:quizId'
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(result) {
    res.render('quizes/show', {
      quiz: result
    });
  });
};

// Metodo manejador de la peticion GET '/quizes/:quizId/answer'
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(results) {
    // Evaluamos la respuesta y componemos el mensaje con el que responder
    if (req.query.answer.toLowerCase() === results.respuesta.toLowerCase()) {
      // Enviamos respuesta a la vista
      res.render('quizes/answer', {
        'message': 'Enhorabuena!! la respuesta ' + results.respuesta + ' es correcta.'
      });
    } else {
      // Enviamos respuesta a la vista
      res.render('quizes/answer', {
        'message': 'Ooohhh!! la respuesta es incorrecta. La respuesta correcta es ' + results.respuesta
      });
    }


  });
};
