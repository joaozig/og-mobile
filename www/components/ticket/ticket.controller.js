angular.module('ticket')

.controller('TicketController', function($stateParams, GameService) {
	var vm = this;

	/* Properties */
	vm.game;
	vm.ticketTypes;

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
	}
});