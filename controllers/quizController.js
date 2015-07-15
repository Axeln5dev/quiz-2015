var models = require('../models/models');

/*
 * Controlador para las peticiones relaciondas con las preguntas y respuestas del juego QUIZ 2015
 */

// Metodo manejador de la peticion GET '/question'
exports.question = function(req, res) {
  models.Quiz.findAll().then(function(results) {
    res.render('quizes/question', {
      'quiz_question': results[0].pregunta
    });
  });
};

// Metodo manejador de la peticion GET '/answer'
exports.answer = function(req, res) {
  models.Quiz.findAll().then(function(results) {
    // Evaluamos la respuesta y componemos el mensaje con el que responder
    if (req.query.answer.toLowerCase() === results[0].respuesta.toLowerCase()) {
      // Enviamos respuesta a la vista
      res.render('quizes/answer', {
        'message': 'Enhorabuena!! la respuesta ' + results[0].respuesta + ' es correcta.'
      });
    } else {
      // Enviamos respuesta a la vista
      res.render('quizes/answer', {
        'message': 'Ooohhh!! la respuesta es incorrecta. La respuesta correcta es ' + results[0].respuesta
      });
    }


  });
};
