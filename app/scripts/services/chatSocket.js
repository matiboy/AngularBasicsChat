'use strict';

angular.module('ChatFrontendApp')
  .service('Chatsocket', function Chatsocket(socket, $q, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var emitEvents = {
      REGISTER: 'register',
      LIST_USERS: 'listUsers'
    };

    var receiveEvents = {
      REGISTERED: 'registered',
      USER_LIST: 'userList'
    };

    return {
      register: function(name) {
        var q = $q.defer();
        socket.on(receiveEvents.REGISTERED, function() {
          q.resolve({
            success: true,
            id: name
          });
        });
        socket.emit(emitEvents.REGISTER, name);
        $timeout( function() {
          q.resolve({
            success: false,
            error: 'Unable to connect to server'
          });
        },  5000);
        return q.promise;
      },
      listUsers: function() {
        var q = $q.defer();
        socket.on(receiveEvents.USER_LIST, function(data){
          q.resolve(data);
        });
        socket.emit(emitEvents.LIST_USERS);
        return q.promise;
      }
    }
  });
