angular.module('main')

.controller('MainController', function($ionicPopup, $ionicHistory, $state, MainService) {
	var vm = this;

	/* Properties */
	vm.sports = [];
	vm.hideLoadingSpinner = false;

	/* Public Methods */

	/* Initialization */
	init();

	/**********/

	function init() {
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
});