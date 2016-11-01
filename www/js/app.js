// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ourigol', [
  'ionic',
  'login',
  'main',
  'countries',
  'championship',
  'game'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  var componentsFolder = 'components';

  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppController as ctrl'
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/login/login.html',
          controller: 'LoginController as ctrl'
        }
      }
    })

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/main/main.html',
          controller: 'MainController as ctrl'
        }
      }
    })

    .state('app.countries', {
      url: '/countries/:sportId',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/countries/countries.html',
          controller: 'CountriesController as ctrl'
        }
      }
    })

    .state('app.championships', {
      url: '/championships/:countryId',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/championship/championship.html',
          controller: 'ChampionshipController as ctrl'
        }
      }
    })

    .state('app.games', {
      url: '/games/:championshipId',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/game/game.html',
          controller: 'GameController as ctrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/login');
  $urlRouterProvider.otherwise('/app/main');
})

.controller('AppController', function($state) {
  var vm = this;

  vm.doLogout = doLogout;

  function doLogout() {
    $state.go('app.login');
  }
});