'use strict';

angular.module('ChatFrontendApp', ['ngRoute', 'btford.socket-io', 'ChatFrontendApp.services'])
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
    var socket = io.connect('http://localhost:5555');
    socketProvider.ioSocket(socket);
  }).config(function(ChatserviceProvider){
    ChatserviceProvider.setDateFormat('h:mm:ss a');
  }).run(function(socket){
    console.log(socket);
  });
