var models = require('../models/models');

// Autoload - Factoriza el codigo si la ruta contiene quizId
exports.load = function(req, res, next, quizId) {
  console.log('autoload!!!');
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe ' + quizId));
      }
    }
  ).catch(function(error){
    next(error);
  });
};

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
  res.render('quizes/show', {
    quiz: req.quiz
  });
};

// Metodo manejador de la peticion GET '/quizes/:quizId/answer'
exports.answer = function(req, res) {
  // Evaluamos la respuesta y componemos el mensaje con el que responder
  if (req.query.answer.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    // Enviamos respuesta a la vista
    res.render('quizes/answer', {
      'message': 'Enhorabuena!! la respuesta ' + req.quiz.respuesta + ' es correcta.'
    });
  } else {
    // Enviamos respuesta a la vista
    res.render('quizes/answer', {
      'message': 'Ooohhh!! la respuesta es incorrecta. La respuesta correcta es ' + req.quiz.respuesta
    });
  }
};
