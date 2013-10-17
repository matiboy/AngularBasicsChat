'use strict';

angular.module('ChatFrontendApp')
  .directive('pressEnter', function ($parse) {
    var pressEnter;
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        pressEnter = $parse(tAttrs.pressEnter);
        return function postLink(scope, element, attrs) {
          var action = pressEnter(scope);
          element.on('keypress', function press(e) {
            if(e.keyIdentifier === 'Enter') {
              action();
            }
          });
        };
      }
    };
  });
