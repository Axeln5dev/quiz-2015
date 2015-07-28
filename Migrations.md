NOTA: Las instrucciones indicadas en este fichero y la ejecución de los comandos indicados corren
bajo tu propia responsabilidad. 


MIGRACION DE LA BBDD EN LOCAL
-----------------------------
Instrucciones para migrar la BBDD sin perder los datos

1. Añadir a package.json se quelize-cli con "sequelize-cli": "^1.7.2"
2. Crear la carpeta config en la raiz del la aplicacion.
3. Crear el fichero config.json dentro de la carpeta config. El fchero tendra el siguiente contenido:

  {
    "development": {
      "username": null,
      "password": null,
      "database": null,
      "host": null,
      "dialect": "sqlite",
      "storage": "quiz.sqlite"
    },
    "production": {
      "use_env_variable": "DATABASE_URL"
    }
  }

4. Crar carpeta migrations en la raiz del proyecto.
5. Crear fichero migrations.js con el siguiente contenido:

  module.exports = {
    up: function(migration, DataTypes) {
      // Logica con los cambios de la BBDD, En este ejemplo se crea la columna tema en la tabla Quizzes
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
      // Logica en caso de querer revertir los cambios (para mas info ver sequelize --help)
    }
  }

6. Instalar el paquete sequelize-cli:

  npm install sequelize-cli

7. Ejecucion de script de migracion con el comando:

  node_modules/.bin/sequelize db:migrate


MIGRACION DE LA BBDD EN HEROKU
------------------------------
Instruncciones para migrar la BBDD en Heroku sin perder los datos

1. Añadir a package.json se quelize-cli con "sequelize-cli": "^1.7.2"
2. Crear la carpeta config en la raiz del la aplicacion.
3. Crear el fichero config.json dentro de la carpeta config. El fchero tendra el siguiente contenido:

  {
    "production": {
      "use_env_variable": "DATABASE_URL"
    }
  }

  NOTA: El fichero tiene este formato para no desvelar usuario y password de la BBDD

4. Crar carpeta migrations en la raiz del proyecto.
5. Crear fichero migrations.js con el siguiente contenido:

  module.exports = {
    up: function(migration, DataTypes) {
      // Logica con los cambios de la BBDD, En este ejemplo se crea la columna tema en la tabla Quizzes
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

6. Hacer commit en GIT de los cambios realizados
7. Subir los cambios a heroku con:

  git push heroku master

8. Instalar el paquete sequelize-cli en heroku con:

  heroku run npm install sequelize-cli

9. Ejecucion de script de migracion con el comando:

  heroku run node_modules/.bin/sequelize db:migrate  --env production -app <YOUR_APP_NAME>

    por ejemplo:

  heroku run node_modules/.bin/sequelize db:migrate  --env production -app <YOUR_APP_NAME>
