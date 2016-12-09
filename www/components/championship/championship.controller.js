angular.module('championship')

.controller('ChampionshipController', function($stateParams, $ionicPopup, CountriesService, ChampionshipService) {

	var vm = this;

	/* Properties */
	vm.country = {};
	vm.championships = [];

	/* Public Methods */

	/* Initialization */
	init();

	/**********/

	function init() {
		CountriesService.getCountry($stateParams.countryId).then(
			function(country) {
				vm.country = country;
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);

		ChampionshipService.getChampionshipsMock($stateParams.countryId).then(
			function(championships) {
				vm.championships = championships;
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