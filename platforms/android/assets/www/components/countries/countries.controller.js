angular.module('countries')

.controller('CountriesController', function($stateParams, $ionicPopup, MainService, CountriesService) {

	var vm = this;

	/* Properties */
	vm.sport = {};
	vm.countries = [];

	/* Public Methods */

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

		CountriesService.getCountries($stateParams.sportId).then(
			function(countries) {
				vm.countries = countries;
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