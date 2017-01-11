angular.module('results')

.controller('ResultsController', function($ionicPopup, ResultsService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.results;
	vm.hideLoadingSpinner = false;
	vm.shownGroup;
	vm.initialDate;
	vm.finalDate;

	/* Public Methods */
  vm.loadResults = loadResults;
  vm.toggleGroup = toggleGroup;
  vm.currentDate = currentDate;
  vm.prevDate = prevDate;
  vm.nextDate = nextDate;

	/* Initialization */
	init();

	/**********/

	function init() {
		vm.currentDate();
	}

	function setDates(date) {
		vm.initialDate = vm.util.getMonday(date);
		vm.finalDate = vm.util.getSunday(date);
		vm.loadResults();
	}

	function loadResults() {
		vm.hideLoadingSpinner = false;

		var initialDate = vm.util.formatFilterDate(vm.initialDate);
		var finalDate = vm.util.formatFilterDate(vm.finalDate);

		ResultsService.getResults(initialDate, finalDate).then(
			function(data) {
				vm.shownGroup = new Array(data.length).fill(true);
				vm.results = data;
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

	function toggleGroup(index) {
    vm.shownGroup[index] = !vm.shownGroup[index];
  };

  function prevDate() {
  	setDates(vm.initialDate.setDate(vm.initialDate.getDate() - 2));
  }

  function nextDate() {
		setDates(vm.finalDate.setDate(vm.finalDate.getDate() + 2));
  }

  function currentDate() {
  	var date = new Date();
		setDates(date);
  }
});