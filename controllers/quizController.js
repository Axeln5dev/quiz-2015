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

// Metodo manejador de la peticion GET '/quizes'
exports.index = function(req, res) {
  if (req.query.search) {
    var searchString = '%' + req.query.search.replace(' ', '%') + '%';
    console.log('searchString: ' + searchString);
    models.Quiz.findAll({ where: ["pregunta like ?", searchString] }).then(function(results) {
      console.log(JSON.stringify(results));
      res.render('quizes/index', {
        quizes: results,
        errors: []
      });
    });
  } else {
    models.Quiz.findAll().then(function(results) {
      res.render('quizes/index', {
        quizes: results,
        errors: []
      });
    });

  }
};

// Metodo manejador de la peticion GET '/quizes/:quizId'
exports.show = function(req, res) {
  res.render('quizes/show', {
    quiz: req.quiz,
    errors: []
  });
};

// Metodo manejador de la peticion GET '/quizes/:quizId/answer'
exports.answer = function(req, res) {
  // Evaluamos la respuesta y componemos el mensaje con el que responder
  if (req.query.answer.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    // Enviamos respuesta a la vista
    res.render('quizes/answer', {
      'message': 'Enhorabuena!! la respuesta ' + req.quiz.respuesta + ' es correcta.',
      errors: []
    });
  } else {
    // Enviamos respuesta a la vista
    res.render('quizes/answer', {
      'message': 'Ooohhh!! la respuesta es incorrecta. La respuesta correcta es ' + req.quiz.respuesta,
      errors: []
    });
  }
};

// Manejador del GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build({pregunta: 'pregunta', respuesta: 'respuesta'});

  res.render('quizes/new', {
    quiz: quiz,
    errors: []
  });
};

// Manejador del POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then(function(err) {
    console.log('ERROR:::> ' + err);
    if (err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else {
      quiz.save({fields: ['pregunta', 'respuesta']}).then(function() {
        res.redirect('/quizes');
      });
    }
  })
};
