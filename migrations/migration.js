module.exports = {
  up: function(migration, DataTypes) {
    // logic for transforming into the new state
    migration.addColumn(
      'Quizzes',
      'tema',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'otro'
      }
    )
  },

  down: function(migration, DataTypes) {
  }
}
