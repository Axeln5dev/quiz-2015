/*
 * Controlador para las peticiones relaciondas con las preguntas y respuestas del juego QUIZ 2015
 */

// Metodo manejador de la peticion GET '/question'
exports.question = function(req, res) {
  res.render('quizes/question', {
    'quiz_question': '¿Cual es la capital de Italia?'
  });
};

// Metodo manejador de la peticion GET '/answer'
exports.answer = function(req, res) {
  var message = '';
  var answerOk = 'Roma';

  // Evaluamos la respuesta y componemos el mensaje con el que responder
  if (req.query.answer.toLowerCase() === answerOk.toLowerCase()) {
    message = 'Enhorabuena!! la respuesta ' + answerOk + ' es correcta.';
  } else {
    message = 'Ooohhh!! la respuesta es incorrecta. La respuesta correcta es ' + answerOk;
  }

  // Enviamos respuesta a la vista
  res.render('quizes/answer', {
    'message': message
  });
};
