'use strict';

angular.module('ChatFrontendApp')
  .directive('pressEnter', function () {
    return {
      restrict: 'A',
      scope: {
        pressEnter: '='
      },
      link: function postLink(scope, element, attrs) {
        element.on('keypress', function(e) {
          if(e.keyIdentifier === 'Enter') {
            scope.pressEnter();
          }
        });
      }
    };
  });
