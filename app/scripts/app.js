'use strict';

angular.module('ChatFrontendApp', ['ngRoute', 'btford.socket-io'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl as login'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl as chat',
        resolve: {
          register: function(Chatsocket, Userservice) {
            return Chatsocket.register(Userservice.username);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(function(socketProvider){
    var socket = io.connect('http://192.168.43.171:5555');
    socketProvider.ioSocket(socket);
  }).run(function(socket){
    console.log(socket);
  });
