'use strict';

angular.module('ChatFrontendApp')
  .service('Chatsocket', function Chatsocket(socket, $q, $timeout, ChatsocketEmitEvents, ChatsocketReceiveEvents) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      register: function(name) {
        var q = $q.defer();
        socket.on(ChatsocketReceiveEvents.REGISTERED, function() {
          q.resolve({
            success: true,
            id: name
          });
        });
        socket.emit(ChatsocketEmitEvents.REGISTER, name);
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
        socket.on(ChatsocketReceiveEvents.USER_LIST, function(data){
          q.resolve(data);
        });
        socket.emit(ChatsocketEmitEvents.LIST_USERS);
        return q.promise;
      }
    }
  }).value('ChatsocketEmitEvents', {
    REGISTER: 'register',
    LIST_USERS: 'listUsers'
  }).value('ChatsocketReceiveEvents', {
    REGISTERED: 'registered',
    USER_LIST: 'userList'
  });
