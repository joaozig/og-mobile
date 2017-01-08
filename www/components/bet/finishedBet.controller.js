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
		BetService.getFinishedBet($stateParams.betHash).then(
			function(data) {
				vm.bet = data;
				console.log(vm.bet);
			},
			function(errorMessage) {
				console.log(errorMessage);
			}
		);
		// setTimeout(function(){ window.print() }, 1500);
	}

	function newBet() {
		$ionicHistory.goBack();
	}
});