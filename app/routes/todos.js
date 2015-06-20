var users = require('../../app/controllers/users.js');
var todos = require('../../app/controllers/todos.js');

module.exports = function(app){
  app.route('/api/todos')
     .get(users.requiresLogin, todos.list)
     .post(users.requiresLogin, todos.create);

  app.route('/api/todos/:todoId')
     .get(users.requiresLogin, todos.hasAuthorization, todos.read)
     .put(users.requiresLogin, todos.hasAuthorization, todos.update)
     .delete(users.requiresLogin, todos.hasAuthorization, todos.delete);


  app.param('todoId', todos.todoById);
};
