angular.module('ticket')

.controller('TicketController', function($state, $stateParams, $ionicHistory, $ionicPopup, GameService, TicketService, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.game = {};
	vm.ticketTypes = [];

	/* Public Methods */
	vm.addTicketToBet = addTicketToBet;

	/* Initialization */
	init();

	/*********/
	function init() {
		GameService.getGame($stateParams.gameId).then(
			function(game) {
				vm.game = game;
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);

		TicketService.getTicketTypes($stateParams.gameId).then(
			function(ticketTypes) {
				vm.ticketTypes = ticketTypes;
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}

	function addTicketToBet(ticket) {

		var currentBet = BetService.getBet();

		if (!currentBet) {
			$state.go('app.player');
		} else {
			if(BetService.addTicket(ticket)) {
				$ionicHistory.goBack();
			} else {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: 'Não foi possível adicionar o palpite'
				});
			}
		}
	}
});