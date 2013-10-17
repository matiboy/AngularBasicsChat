'use strict';

angular.module('ChatFrontendApp')
  .service('Chatsocket', function Chatsocket(socket, $q, $timeout, $rootScope, ChatsocketEmitEvents, ChatsocketReceiveEvents) {
    // AngularJS will instantiate a singleton by calling "new" on this functio

    // Set up some events
    socket.on(ChatsocketReceiveEvents.MESSAGE_RECEIVED, function(data) {
      $rootScope.$broadcast(ChatsocketReceiveEvents.MESSAGE_RECEIVED, data.from, data.message, data.when);
    });

    socket.on(ChatsocketReceiveEvents.USER_ADDED, function(data) {
      $rootScope.$broadcast(ChatsocketReceiveEvents.USER_ADDED, data);
    });

    socket.on(ChatsocketReceiveEvents.USER_REMOVED, function(data) {
      $rootScope.$broadcast(ChatsocketReceiveEvents.USER_REMOVED, data);
    });

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
      },
      sendMessage: function(user, message) {
        socket.emit(ChatsocketEmitEvents.SEND_MESSAGE, [user, message]);
      }
    }
  }).value('ChatsocketEmitEvents', {
    REGISTER: 'register',
    LIST_USERS: 'listUsers',
    SEND_MESSAGE: 'sendMessage'
  }).value('ChatsocketReceiveEvents', {
    REGISTERED: 'registered',
    USER_LIST: 'userList',
    MESSAGE_RECEIVED: 'messageReceived',
    USER_ADDED: 'userAdded',
    USER_REMOVED: 'userRemoved'
  });
