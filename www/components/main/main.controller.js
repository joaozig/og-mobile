angular.module('main')

.controller('MainController', function($ionicPopup, MainService) {
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