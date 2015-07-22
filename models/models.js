var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Importamos el ORM Sequelize
var Sequelize = require('sequelize');

// Definimos la instacia de BBDD que vamos a usar
// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Importamos las definiciones de Modelo
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
// Exportamos la definicion del modelo
exports.Quiz = Quiz;

// Sincronizamos las tablas segun la definicion de los modelos
sequelize.sync().success(function() {
  // success se ejecuta una vez sincronizados los modelos y por lo tanto las tablas
  Quiz.count().success(function(count) {
    // Creamos datos en el entorno de produccion
    if (count === 1) {
      Quiz.create({
        pregunta: 'Capital de Francia',
        respuesta: 'Paris'
      });
      Quiz.create({
        pregunta: 'Capital de Alemania',
        respuesta: 'Berlin'
      });
      Quiz.create({
        pregunta: 'Capital de España',
        respuesta: 'Madrid'
      });
      Quiz.create({
        pregunta: 'Capital de Rusia',
        respuesta: 'Moscú'
      })
      .success(function() {
        console.log('Base de datos inicializada correctamente.')
      });
    }
  });
})
