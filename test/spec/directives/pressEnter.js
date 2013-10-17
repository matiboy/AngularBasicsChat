'use strict';

describe('Directive: pressEnter', function () {

  // load the directive's module
  beforeEach(module('ChatFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<press-enter></press-enter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pressEnter directive');
  }));
});
