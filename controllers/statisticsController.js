var models = require('../models/models');

exports.index = function(req, res) {
  var statistics = {
    numQuizes: 0,               // El número de preguntas
    numComments: 0,             // El número de comentarios totales
    numCommentsByQuiz: 0,       // El número medio de comentarios por pregunta
    numQuizesWithoutComments: 0, // El número de preguntas sin comentarios
    numQuizesWithComments: 0    // El número de preguntas con comentarios
  };

  models.Quiz.findAll({
    include: [ {model:  models.Comment} ]
    }).then(
    function(quizes) {

      // Guaradamos el numero de quizes
      statistics.numQuizes = quizes.length;

      console.log('preguntas: ' + quizes.length);
      for (var x = 0; x < quizes.length; x++) {
        console.log('quizes[x].Comments: ' + quizes[x].Comments);
        if (quizes[x].Comments.length > 0) {
          statistics.numComments = statistics.numComments + quizes[x].Comments.length ;
          statistics.numQuizesWithComments++;
        } else {
          statistics.numQuizesWithoutComments++;
        }
      }

      statistics.numCommentsByQuiz = statistics.numComments / statistics.numQuizes;

      res.render('statistics/show', {
        statistics: statistics,
        errors: []
      });
    }
  ).catch(function(error){
    next(error);
  });
};
