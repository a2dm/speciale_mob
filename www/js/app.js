// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova'])

    .run(function($ionicPlatform) {

      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

          .state('app', {
            cache: false,
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppController'
          })

          .state('login', {
              cache: false,
              url: '/login',
              templateUrl: 'templates/login.html',
              controller: 'LoginController'
          })

          .state('app.pedido-list', {
            cache: false,
            url: '/pedido-list',
            views: {
              'menuContent': {
                templateUrl: 'templates/pedido-list.html',
                controller: 'PedidoListController'
              }
            }
          })

          .state('app.pedido-cad', {
            cache: false,
            url: '/pedido-cad',
            views: {
              'menuContent': {
                templateUrl: 'templates/pedido-cad.html',
                controller: 'PedidoCadController'
              }
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');
    });