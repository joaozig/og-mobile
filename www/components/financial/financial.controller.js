angular.module('financial')

.controller('FinancialController', function($state, $ionicPopup, FinancialService, LoginService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.types;
	vm.resume;
	vm.shownGroup = [true, true, true];
	vm.hideLoadingSpinner = false;
	vm.initialDate;
	vm.finalDate;

	/* Public Methods */
  vm.loadTypes = loadTypes;
  vm.toggleGroup = toggleGroup;
  vm.typeClass = typeClass;
  vm.prevDate = prevDate;
  vm.nextDate = nextDate;
  vm.financialManager = financialManager;
  vm.betResume = betResume;

	/* Initialization */
	init();

	/**********/

	function init() {
		var date = new Date();
		setDates(date);
	}

	function setDates(date) {
		vm.initialDate = vm.util.getMonday(date);
		vm.finalDate = vm.util.getSunday(date);
		vm.loadTypes();
	}

	function loadTypes() {
		vm.hideLoadingSpinner = false;

		var initialDate = vm.util.formatFilterDate(vm.initialDate);
		var finalDate = vm.util.formatFilterDate(vm.finalDate);

		FinancialService.getBets(initialDate, finalDate).then(
			function(data) {
				var types = [data[0], data[1], data[2]];
				var resume = data[3];
				vm.types = types;
				vm.resume = resume.resume[0];
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

	function financialManager() {
		var user = LoginService.getUser();
		if(user.profile != 20) {
			$state.go('app.financialManager', {initialDate: vm.initialDate});
		}
	}

	function betResume(bet) {
		$state.go('app.betResume', {betHash: bet.hash});
	}

	function toggleGroup(index) {
    vm.shownGroup[index] = !vm.shownGroup[index];
  };

  function typeClass(typeIndex) {
  	if(typeIndex == 0) {
  		return 'item-dark';
  	} else if(typeIndex == 1) {
  		return 'item-positive';
  	} else if(typeIndex == 2) {
  		return 'item-assertive';
  	}
  }

  function prevDate() {
  	setDates(vm.initialDate.setDate(vm.initialDate.getDate() - 2));
  }

  function nextDate() {
		setDates(vm.finalDate.setDate(vm.finalDate.getDate() + 2));
  }
});