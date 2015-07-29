var models = require('../models/models');

// Autoload - Factoriza el codigo si la ruta contiene commentId
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
    where: { id: commentId }}).then(
    function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else {
        next(new Error('No existe ' + commentId));
      }
    }
  ).catch(function(error){
    next(error);
  });
};


// GET '/quiz/:quizId/comments/new'
exports.new = function(req, res) {
  res.render('comments/new', {
    quizId: req.params.quizId,
    errors: []
  });
};

exports.create = function(req, res) {
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
  });

  comment.validate().then(function(err) {
    if (err) {
      res.render('comments/new', {
        quizId: req.params.quizId,
        errors: err.errors
      });
    } else {
      comment.save().then(function() {
        res.redirect('/quizes/' + req.params.quizId);
      });
    }
  });
};

exports.publish = function(req, res) {
  req.comment.publicado = true;
  req.comment.save({fields: ['publicado']}).then(function() {
    res.redirect('/quizes/' + req.params.quizId);
  }).catch(function(error) {
    next(error);
  });
};
