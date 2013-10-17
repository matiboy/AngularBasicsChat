'use strict';

angular.module('ChatFrontendApp.services', [])
  .provider('Chatservice', function Chatservice() {
    // Default values
    var dateFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';

    // Configuration functions
    this.setDateFormat = function(format) {
      dateFormat = format;
    }

    this.$get = function(Chatsocket, Userservice, $rootScope, ChatsocketReceiveEvents) {
      var users = {};

      function receivedMessage(from, message, when) {
        var user = users[from];
        if(user){
          if(!user.active) {
            user.hasNew++;
          }
          addMessage(user, message, when);
        }
      }

      $rootScope.$on(ChatsocketReceiveEvents.MESSAGE_RECEIVED, function(e, from, message) {
        receivedMessage(from, message);
      });

      $rootScope.$on(ChatsocketReceiveEvents.USER_ADDED, function(e, name) {
        addUser(name);
      });

      $rootScope.$on(ChatsocketReceiveEvents.USER_REMOVED, function(e, from, message) {
        removeUser(name);
      });

      function findActiveUser() {
        return _.find(users, function(item){
          return item.active;
        });
      }

      function findUserByName(name) {
        return _.find(users, function(item){
          return item.name === name;
        });
      }

      function addMessage(user, message, when, isMine) {
        user.messages.unshift({
          message: message,
          when: (when ? moment(when) : moment() ).format(dateFormat),
          isMine: isMine
        });
      }

      function addUser(name) {
        if(name!==Userservice.username) {
          users[name] = {
            name: name,
            messages: [],
            hasNew: 0,
            active: false
          };
        }
      }

      function removeUser(name) {
        var user = findUserByName(name);
        users = _.without(users, user);
      }

      return {
        messages: [],
        listUsers: function() {
          return Chatsocket.listUsers().then(function(data) {
            _.each(data, addUser);
            return users;
          });
        },
        activate: function(user) {
          if(user.active) {
            return;
          }
          // Deactivate all
          _.each(users, function(item) {
            item.active = false;
          });
          // Activate specific user
          user.active = true;
          user.hasNew = 0;
          this.messages = user.messages;
        },
        sendMessage: function(message) {
          var user = findActiveUser();
          addMessage(user, message, null, true);
          Chatsocket.sendMessage(user.name, message);
        }
      };
    };
  });
