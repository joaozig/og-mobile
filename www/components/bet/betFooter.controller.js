angular.module('bet')

.directive('betFooter', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/bet/betFooter.html',
    controller: 'BetFooterController as bfCtrl'
  };
})

.controller('BetFooterController', function(BetService) {
  var vm = this;
  vm.util = new Util();

  /* Properties */
  vm.bet = null;

  /* Initialization */
  init();

  /**********/
  function init() {
  	vm.bet = BetService.getBet();
  }
});