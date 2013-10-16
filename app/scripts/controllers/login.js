'use strict';

angular.module('ChatFrontendApp')
  .controller('LoginCtrl', function ($location, Userservice) {
    this.username = '';
    this.register = function() {
      // Set the username
      Userservice.username = this.username;
      // Redirect
      $location.path('/chat');
    }
  });
