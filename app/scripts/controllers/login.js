'use strict';

angular.module('ChatFrontendApp')
  .controller('LoginCtrl', function ($location) {
    this.register = function() {
      $location.path('/chat');
    }
  });
