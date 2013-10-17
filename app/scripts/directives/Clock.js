'use strict';

angular.module('ChatFrontendApp')
  .directive('clock', function () {
    return {
      template: '<div><span ng-bind="hour"></span><span ng-bind="separator"></span><span ng-bind="minute"></span><span ng-bind="separator"></span><span ng-bind="second"></span></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.separator = attrs.separator || '|';
        // Set interval takes us out of the "Angular world"
        // Latest version has a $interval service
        setInterval(function() {
          var now = moment();
          scope.hour = now.format('HH');
          scope.minute = now.format('mm');
          scope.second = now.format('ss');
          // Back into Angular world
          scope.$digest();
        }, 1000);
      }
    };
  });
