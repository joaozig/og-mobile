angular.module('bet')

.directive('betFooter', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/bet/betFooter.html',
    controller: 'BetFooterController as bfCtrl'
  };
})

.controller('BetFooterController', function($scope, BetService) {
  var vm = this;
  vm.util = new Util();
  vm.teste = 'teste';

  /* States */
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     vm.loadBet();
  });

  /* Properties */
  vm.bet = null;

  /* Methods */
  vm.loadBet = loadBet;

  /* Initialization */
  vm.loadBet();

  /**********/
  function loadBet() {
  	vm.bet = BetService.getBet();
  }
});