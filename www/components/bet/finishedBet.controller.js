angular.module('bet')

.controller('FinishedBetController', function($ionicHistory, $stateParams, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;

	/* Public Methods */
	vm.newBet = newBet;

	/* Initialization */
	init();

	/*********/
	function init() {
		$ionicHistory.removeBackView();
		vm.bet = BetService.getFinishedBet($stateParams.betId);
		setTimeout(function(){ window.print() }, 1500);
	}

	function newBet() {
		$ionicHistory.goBack();
	}
});