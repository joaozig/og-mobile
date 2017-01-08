angular.module('bet')

.controller('BetResumeController', function($stateParams, $state, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet;
	vm.hideLoadingSpinner = false;

	/* Public Methods */
	vm.printBet = printBet;

	/* Initialization */
	init();

	/*********/
	function init() {
		loadBet();
	}

	/* Private Methods */

	function loadBet() {
		BetService.getFinishedBet($stateParams.betHash).then(
			function(data) {
				vm.bet = data;
				vm.hideLoadingSpinner = true;
			},
			function(errorMessage) {
				console.log(errorMessage);
			}
		);
	}

	function printBet() {
		$state.go('app.finishedBet', {betHash: $stateParams.betHash});
	}
});