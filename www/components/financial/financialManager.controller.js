angular.module('financial')

.controller('FinancialManagerController', function($stateParams, $ionicPopup, FinancialService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.resume;
	vm.commissions;
	vm.prizes;
	vm.netValues;
	vm.hideLoadingSpinner = false;
	vm.initialDate;
	vm.finalDate;

	/* Public Methods */
  vm.loadData = loadData;
  vm.prevDate = prevDate;
  vm.nextDate = nextDate;

	/* Initialization */
	init();

	/**********/

	function init() {
		var date = $stateParams.initialDate;

		if(!date || date == 'initial'){
			date = new Date();
		}

		setDates(date);
	}

	function setDates(date) {
		vm.initialDate = vm.util.getMonday(date);
		vm.finalDate = vm.util.getSunday(date);

		vm.loadData();
	}

	function loadData() {
		vm.hideLoadingSpinner = false;

		var initialDate = vm.util.formatFilterDate(vm.initialDate);
		var finalDate = vm.util.formatFilterDate(vm.finalDate);

		FinancialService.getResume(initialDate, finalDate).then(
			function(data) {
				vm.resume = data.resume;
				vm.commissions = data.comission;
				vm.prizes = data.jackpot;
				vm.netValues = data.netvalue;
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

  function prevDate() {
  	setDates(vm.initialDate.setDate(vm.initialDate.getDate() - 2));
  }

  function nextDate() {
		setDates(vm.finalDate.setDate(vm.finalDate.getDate() + 2));
  }
});