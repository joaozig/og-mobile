angular.module('ticket')

.controller('TicketController', function($stateParams, $ionicPopup, GameService, TicketService, BetService) {
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
		var confirmPopup = $ionicPopup.confirm({
			title: 'Adicionar Palpite',
			template: 'Você deseja realmente adicionar o palpite?'
		});

		confirmPopup.then(function(confirmed) {
			if(confirmed) {
				if(BetService.addTicket(ticket)) {
					$ionicPopup.alert({
						title: 'Sucesso! :)',
						template: 'Palpite adicionado com sucesso!'
					});
				} else {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: 'Não foi possível adicionar o palpite'
					});
				}
			}
		});
	}
});