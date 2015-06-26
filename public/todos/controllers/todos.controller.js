angular.module('todos')
       .controller('TodosController',
                   [
                     '$scope',
                     '$routeParams',
                     '$location',
                     'Authentication',
                     'Todos',
                     function($scope, $routeParams, $location, Authentication, Todos){
                       $scope.authentication = Authentication;

                       // Create a todo
                       $scope.create = function(){
                         var todo = new Todos({
                           title: this.title,
                           description: this.description
                         });

                         todo.$save(function(response){
                           $location.path('todos/');
                         }, function(errorResponse){
                           $scope.error = errorResponse.data.message;
                         });
                       };

                       // Get all todos
                       $scope.find = function(){
                         $scope.todos = Todos.query();
                       };

                       // Get todo by id
                       $scope.findOne = function(){
                         $scope.todo = Todos.get({
                           todoId: $routeParams.todoId
                         });
                       };

                       // Update todo
                       $scope.update = function(todo){
                         if(todo){
                           todo.$update(function(){
                             return;
                           }, function(errorResponse){
                             $scope.error = errorResponse.data.message;
                           });
                         }
                         else {
                           $scope.todo.$update(function(){
                             $location.path('todos/' + $scope.todo._id);
                           }, function(errorResponse){
                             $scope.error = errorResponse.data.message;
                           });
                         }
                       };


                       // Delete a todo
                       $scope.delete = function(todo){
                         if(todo){
                           todo.$remove(function(){
                             for(var i in $scope.todos){
                               if($scope.todos[i] === todo){
                                 $scope.todos.splice(i, 1);
                               }
                             }
                           });
                         }
                         else {
                           $scope.todo.$remove(function(){
                             $location.path('todos');
                           });
                         }
                       };


                       $scope.toggleNew = function(){
                         $("#new-todo").toggle(400);
                       };

                     }
                   ])
