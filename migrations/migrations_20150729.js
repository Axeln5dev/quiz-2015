module.exports = {
  up: function(migration, DataTypes) {
    // logic for transforming into the new state
    migration.addColumn(
      'Comments',
      'publicado',
      {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    )
  },

  down: function(migration, DataTypes) {
  }
}
