angular.module('todos')
       .config([
         '$routeProvider',
         function($routeProvider){
           $routeProvider
              .when('/todos', {
                templateUrl: 'todos/views/list-todos.html'
              })
              .when('/todos/create', {
                templateUrl: 'todos/views/create-todo.html'
              })
              .when('/todos/:todoId', {
                templateUrl: 'todos/views/view-todo.html'
              })
              .when('/todos/:todoId/edit', {
                templateUrl: 'todos/views/edit-todo.html'
              });
         }
       ]);
