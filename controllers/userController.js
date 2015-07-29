var users = {
  admin : {id:1, username: 'admin', password: '1234'},
  pepe  : {id:2, username: 'pepe', password: '4321'}
};

exports.autenticar = function(login, password, callback) {
  if (users[login]) {
    if (users[login].password === password) {
      callback(null, users[login]);
    } else {
      callback(new Error('Password erroneo'));
    }
  } else {
    callback(new Error('El usuario no existe'));
  }
};
