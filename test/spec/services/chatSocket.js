'use strict';

describe('Service: chatSocket', function () {

  // load the service's module
  beforeEach(module('ChatFrontendApp'));

  // instantiate service
  var chatSocket;
  beforeEach(inject(function (_chatSocket_) {
    chatSocket = _chatSocket_;
  }));

  it('should do something', function () {
    expect(!!chatSocket).toBe(true);
  });

});
