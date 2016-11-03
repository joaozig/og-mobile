angular.module('player')

.controller('PlayerController', function($state, $ionicPopup, BetService) {

	var vm = this;

	/* Properties */
	vm.bet = {};
	vm.playerName = '';
	vm.betAmount = '';

	/* Public Methods */
	vm.addBet = addBet;

	/* Initialization */
	init();

	/********/
	function init() {
		vm.bet = BetService.getBet();
		console.log(vm.bet)
	}

	function addBet() {
		BetService.addBet(vm.playerName, vm.betAmount).then(
			function(bet) {
				$state.go('app.main');
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}
});