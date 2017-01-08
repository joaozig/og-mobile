angular.module('games')

.controller('GamesController', function($scope, $state, $stateParams, $ionicPopup, MainService, ChampionshipService, BetService) {

	var vm = this;
	vm.util = new Util();

  /* States */
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     vm.updatePageData();
  });

	/* Properties */
	vm.bet = null;
	vm.sport = {};
	vm.championships = [];
	vm.hideLoadingSpinner = false;
	vm.selectedChampionshipIndex = null;
	vm.selectedGameIndex = null;

	/* Public Methods */
	vm.addTicketToBet = addTicketToBet;
	vm.seeMoreTickets = seeMoreTickets;
  vm.toggleGroup = toogleGroup;
  vm.isGroupShown = isGroupShown;
  vm.loadChampionships = loadChampionships;
  vm.updatePageData = updatePageData;
  vm.updateBet = updateBet;

	/* Initialization */
	init();

	/**********/

	function init() {
		vm.updateBet();
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

	function updateBet() {
		vm.bet = BetService.getBet();
	}

	function addTicketToBet(ticket, game, championship, gameIndex, championshipIndex) {
		var currentBet = BetService.getBet();

		if (!currentBet) {
			$state.go('app.player');
		} else {
			game.championship = JSON.parse(JSON.stringify(championship));
			ticket.ticketType = {name: game.ticketType[0].name};
			ticket.ticketType.game = JSON.parse(JSON.stringify(game));
			BetService.addTicket(ticket).then(
				function() {
					vm.championships[championshipIndex].games[gameIndex].alreadyAdded = true;
					vm.championships[championshipIndex].games[gameIndex].currentTicket = ticket;
					vm.updateBet();
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
				vm.championships = championships;
				vm.updatePageData();
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

	function updatePageData() {
		vm.updateBet();
		var championships = vm.championships;
		championships.forEach(function(championship, index) {
			championship.games = championship.games.map(function(game){
				var ticket = BetService.getTicketByGameFromBet(game);
				if (ticket) {
					game.currentTicket = ticket;
					game.alreadyAdded = true;
				} else {
					game.alreadyAdded = false;
				}

				return game;
			});
			vm.championships[index] = championship;
		});
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