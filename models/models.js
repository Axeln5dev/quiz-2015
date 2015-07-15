var path = require('path');

// Importamos el ORM Sequelize
var Sequelize = require('sequelize');

// Definimos la instacia de BBDD que vamos a usar
var sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: 'quiz.sqlite'
});

// Importamos las definiciones de Modelo
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
// Exportamos la definicion del modelo
exports.Quiz = Quiz;

// Sincronizamos las tablas segun la definicion de los modelos
sequelize.sync().success(function() {
  // success se ejecuta una vez sincronizados los modelos y por lo tanto las tablas
  Quiz.count().success(function(count) {
    if (count === 0) {
      Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma'
      }).success(function() {
        console.log('Base de datos inicializada correctamente.')
      });
    }
  });
})
