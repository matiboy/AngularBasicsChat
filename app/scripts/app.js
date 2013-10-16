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
          socket: function(socket, $q, $timeout) {
            var q = $q.defer();
            // Listen to response
            socket.on('registered', function(data) {
              q.resolve({
                success: true,
                id: data
              });
            });
            // Send out registration
            socket.emit('register', 'hello');
            // Promises are only resolved once, so this will only happen if we didn't recieve the connected event within 5s
            $timeout( function() {
              q.resolve({
                success: false,
                message: 'Time out'
              });
            },  5000);
            return q.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(function(socketProvider){
    var socket = io.connect('http://192.168.1.137:5555');
    socketProvider.ioSocket(socket);
  }).run(function(socket){
    console.log(socket);
  });
