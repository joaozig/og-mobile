angular.module('ticket')

.controller('TicketController', function($state, $stateParams, $ionicHistory, $ionicPopup, GameService, BetService) {
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
		GameService.getGame($stateParams.gameId, $stateParams.sportId, $stateParams.countryId).then(
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
	}

	function addTicketToBet(ticket, ticketType) {

		var currentBet = BetService.getBet();

		if (!currentBet) {
			$state.go('app.player');
		} else {
			ticket.ticketType = {name: ticketType.name};
			ticket.ticketType.game = JSON.parse(JSON.stringify(vm.game));
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