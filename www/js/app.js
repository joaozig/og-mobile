// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ourigol', [
  'app',
  'ionic',
  'login',
  'main',
  'countries',
  'championship',
  'game',
  'games',
  'ticket',
  'player',
  'bet',
  'financial'
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

    .state('app.player', {
      url: '/player',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/player/player.html',
          controller: 'PlayerController as ctrl'
        }
      }
    })

    .state('app.bet', {
      url: '/bet',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/bet/bet.html',
          controller: 'BetController as ctrl'
        }
      }
    })

    .state('app.finishedBet', {
      url: '/bet/finished/:betId',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/bet/finished.html',
          controller: 'FinishedBetController as ctrl'
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
      url: '/games/:sportId',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/games/games.html',
          controller: 'GamesController as ctrl'
        }
      }
    })

    .state('app.tickets', {
      url: '/tickets/:gameId&:sportId&:countryId',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/ticket/ticket.html',
          controller: 'TicketController as ctrl'
        }
      }
    })

    .state('app.financial', {
      url: '/financial',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/financial/financial.html',
          controller: 'FinancialController as ctrl'
        }
      }
    })

    .state('app.financialManager', {
      url: '/financial/manager/:initialDate',
      views: {
        'menuContent': {
          templateUrl: componentsFolder + '/financial/financialManager.html',
          controller: 'FinancialManagerController as ctrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  if(window.localStorage.getItem('user')) {
    $urlRouterProvider.otherwise('/app/main');
  } else {
    $urlRouterProvider.otherwise('/app/login');
  }
});

angular.module('app', [])
.controller('AppController', function($state, $ionicPopup) {
  var vm = this;

  vm.doLogout = doLogout;

  function doLogout() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Sair',
      template: 'Você deseja realmente sair?'
    });

    confirmPopup.then(function(confirmed) {
      if(confirmed) {
        window.localStorage.removeItem('user');
        $state.go('app.login');
      }
    });
  }
});