// Modelo Quiz
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('Quiz', {
    pregunta: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: 'Campos pregunta obligatorio'} }
    },

    respuesta: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: 'Campos respuesta obligatorio'} }
    },

    tema: {
      type: DataTypes.STRING
    }
  });
}
