// Metodo manejador de la peticion GET '/question'
exports.author = function(req, res) {
  res.render('author/author', {
    'author': {
        name: 'Alejandro',
        image: '/images/photo.png',
        description: 'Soy el creador de esta web!!'
      },
    errors: []
  });
};
