'use strict';

angular.module('ChatFrontendApp')
  .service('Chatservice', function Chatservice(Chatsocket) {
    var users = {};
    return {
      listUsers: function() {
        return Chatsocket.listUsers().then(function(data) {
          _.each(data, function(user) {
            users[user] = {
              name: user,
              messages: [],
              hasNew: 0,
              active: false
            };
          });
          return users;
        });
      }
    };
  });
