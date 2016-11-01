angular.module('game')

.controller('GameController', function($stateParams, $ionicPopup, ChampionshipService, GameService) {

	var vm = this;

	/* Properties */
	vm.championship = {};
	vm.games = [];

	/* Public Methods */

	/* Initialization */
	init();

	/**********/

	function init() {
		ChampionshipService.getChampionship($stateParams.championshipId).then(
			function(championship) {
				vm.championship = championship;
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);

		GameService.getGames($stateParams.championshipId).then(
			function(games) {
				vm.games = games;
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