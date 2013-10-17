'use strict';

angular.module('ChatFrontendApp')
  .controller('LoginCtrl', function ($scope, $location, Userservice) {
    $scope.username = '';
    $scope.register = function() {
      // Set the username
      Userservice.username = $scope.username;
      // Redirect
      $location.path('/chat');
    }
  });
