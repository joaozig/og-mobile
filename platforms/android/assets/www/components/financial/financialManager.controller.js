angular.module('financial')

.controller('FinancialManagerController', function($state, $stateParams, $ionicPopup, FinancialService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.general;
	vm.showGeneral;
	vm.groups;
	vm.resume;
	vm.commissions;
	vm.prizes;
	vm.netValues;
	vm.hideLoadingSpinner = false;
	vm.initialDate;
	vm.finalDate;

	/* Public Methods */
  vm.loadData 		= loadData;
  vm.prevDate 		= prevDate;
  vm.nextDate 		= nextDate;
  vm.currentDate 	= currentDate;
  vm.sellerBets 	= sellerBets;
  vm.toggleGroup = toggleGroup;
  vm.isGroupShown = isGroupShown;

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
				vm.general = data.shift();
				vm.groups = data;

				if(vm.general.admin) {
					vm.showGeneral = true;
				} else {
					vm.showGeneral = false;
					vm.toggleGroup(vm.groups[0]);
				}

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

  function currentDate() {
		var date = new Date();
		setDates(date);
  }

  function sellerBets(group) {
  	$state.go('app.financial', {group: group.id, seller: 0, initialDate: vm.initialDate});
  }

	function toggleGroup(group) {
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