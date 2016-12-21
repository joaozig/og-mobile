angular.module('games')

.controller('GamesController', function($scope, $state, $stateParams, $ionicPopup, MainService, ChampionshipService, BetService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.sport = {};
	vm.championships = [];
	vm.hideLoadingSpinner = false;

	/* Public Methods */
	vm.addTicketToBet = addTicketToBet;
	vm.seeMoreTickets = seeMoreTickets;
  vm.toggleGroup = toogleGroup;
  vm.isGroupShown = isGroupShown;
  vm.loadChampionships = loadChampionships;

	/* Initialization */
	init();

	/**********/

	function init() {
		MainService.getSport($stateParams.sportId).then(
			function(sport) {
				vm.sport = sport;
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);

		vm.loadChampionships();
	}

	function addTicketToBet(ticket, game, championship) {

		var currentBet = BetService.getBet();

		if (!currentBet) {
			$state.go('app.player');
		} else {
			game.championship = JSON.parse(JSON.stringify(championship));
			ticket.ticketType = {name: game.ticketType[0].name};
			ticket.ticketType.game = JSON.parse(JSON.stringify(game));

			BetService.addTicket(ticket).then(
				function() {
					$state.go('app.bet');
				},
				function(errorMessage) {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: errorMessage
					});
				});
		}
	}

	function seeMoreTickets(game, championship) {
		$state.go('app.tickets', {gameId: game.id, sportId: vm.sport.id, countryId: championship.country.id});
	}

	function loadChampionships() {
		ChampionshipService.getChampionships($stateParams.sportId).then(
			function(championships) {
				// vm.championships = championships.splice(0, 40);
				vm.championships = championships;
				vm.hideLoadingSpinner = true;
				vm.toggleGroup(vm.championships[0]);
				$scope.$broadcast('scroll.refreshComplete');
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
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
});