var mainApplicationModuleName = 'mean';

// Declare main module and dependencies
var mainApplicationModule = angular.module(mainApplicationModuleName,
    ['ngRoute', 'users' 'example']);

// Configure routes to start with #! for SEO
mainApplicationModule.config(['$locationProvider',
    function($locationProvider){
      $locationProvider.hashPrefix('!');
    }
]);

angular.element(document).ready(function(){
  angular.bootstrap(document, [mainApplicationModuleName]);
});
