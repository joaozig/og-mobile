angular.module('games')

.controller('GamesController', function($scope, $stateParams, $ionicPopup, MainService, ChampionshipService) {

	var vm = this;

	/* Properties */
	vm.sport = {};
	vm.championships = [];
	vm.hideLoadingSpinner = false;

	/* Public Methods */
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