angular.module('bet')

.controller('BetResumeController', function($stateParams, $state, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet;
	vm.hideLoadingSpinner = false;

	/* Public Methods */
	vm.printBet = printBet;
	vm.getColorStatus = getColorStatus;

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

	function getColorStatus(status) {
		if(status.toLowerCase() == 'errou'){
			return 'red';
		} else if(status.toLowerCase() == 'pendente') {
			return 'orange';
		} else {
			return 'green';
		}
	}

	function printBet() {
		$state.go('app.finishedBet', {betHash: $stateParams.betHash});
	}
});