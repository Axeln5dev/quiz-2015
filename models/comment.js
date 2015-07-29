module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment',  {
    texto: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: 'Campos texto obligatorio'} }
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
}
