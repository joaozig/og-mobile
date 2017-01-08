angular.module('main')

.controller('MainController', function($scope, $ionicPopup, $ionicHistory, $state, MainService, BetService) {
	var vm = this;

  /* States */
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     vm.updateBet();
  });

	/* Properties */
	vm.bet = null;
	vm.sports = [];
	vm.hideLoadingSpinner = false;
	vm.updateBet = updateBet;

	/* Public Methods */

	/* Initialization */
	init();

	/**********/

	function init() {
		vm.updateBet();

		MainService.getSports().then(
			function(sports) {
				vm.sports = sports;
				vm.hideLoadingSpinner = true;
				if(vm.sports.length == 1) {
					$ionicHistory.nextViewOptions({
					  disableBack: true
					});
					$state.go('app.games', {sportId: vm.sports[0].id});
				}
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}

	function updateBet() {
		vm.bet = BetService.getBet();
	}
});