angular.module('ticket')

.controller('TicketController', function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, GameService, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.game = {};
	vm.ticketTypes = [];
	vm.hideLoadingSpinner = false;

	/* Public Methods */
	vm.addTicketToBet = addTicketToBet;
	vm.toggleGroup = toogleGroup;
  vm.isGroupShown = isGroupShown;
  vm.loadGame = loadGame;

	/* Initialization */
	init();

	/*********/
	function init() {
		vm.loadGame();
	}

	function addTicketToBet(ticket, ticketType) {

		var currentBet = BetService.getBet();

		if (!currentBet) {
			$state.go('app.player');
		} else {
			ticket.ticketType = {name: ticketType.name};
			ticket.ticketType.game = JSON.parse(JSON.stringify(vm.game));

			BetService.addTicket(ticket).then(
				function() {
					$ionicHistory.goBack();
				},
				function(errorMessage) {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: errorMessage
					});
				});
		}
	}

	function toogleGroup(group) {
    if (vm.isGroupShown(group)) {
      vm.shownGroup = null;
    } else {
      vm.shownGroup = group;
    }
  };

  function isGroupShown(group) {
    return vm.shownGroup === group;
  };

  function loadGame() {
		GameService.getGame($stateParams.gameId, $stateParams.sportId, $stateParams.countryId).then(
			function(game) {
				vm.game = game;
				vm.hideLoadingSpinner = true;
				$scope.$broadcast('scroll.refreshComplete');
				vm.toggleGroup(vm.game.ticketType[0]);
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