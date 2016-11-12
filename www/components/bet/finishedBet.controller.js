angular.module('bet')

.controller('FinishedBetController', function($state, $stateParams, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;

	/* Initialization */
	init();

	/*********/
	function init() {
		vm.bet = BetService.getFinishedBet($stateParams.betId);
		console.log(vm.bet);
	}
});