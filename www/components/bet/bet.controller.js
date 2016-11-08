angular.module('bet')

.controller('BetController', function($ionicPopup, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;
	vm.showEndedBetButton = false;

	/* Public Methods */
	vm.removeTicket = removeTicket;

	/* Initialization */
	init();

	/*********/
	function init() {
		_setBet();
	}

	function removeTicket(ticketId) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Remover Palpite',
			template: 'Você deseja realmente remover o palpite da aposta?'
		});

		confirmPopup.then(function(confirmed) {
			if(confirmed) {
				if(BetService.removeTicket(ticketId)) {
					_setBet();
				} else {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: 'Não foi possível remover o palpite da aposta'
					});
				}
			}
		});
	}

	/* Private Methods */

	function _setBet() {
		vm.bet = BetService.getBet();
		vm.showEndedBetButton = (vm.bet.tickets.length > 0);
	}
});