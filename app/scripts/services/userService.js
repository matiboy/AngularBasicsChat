'use strict';

angular.module('ChatFrontendApp')
  .service('Userservice', function Userservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      username: null
    };
  });
