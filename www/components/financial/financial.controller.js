angular.module('financial')
.config(function($ionicConfigProvider) {
	$ionicConfigProvider.scrolling.jsScrolling(true);
})
.controller('FinancialController', function($state, $stateParams, $ionicPopup, FinancialService, LoginService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.sellers;
	vm.resume;
	vm.sellerId;
	vm.groupId;
	vm.shownGroup = [true, true, true];
	vm.hideLoadingSpinner = false;
	vm.initialDate;
	vm.finalDate;

	/* Public Methods */
  vm.loadData = loadData;
  vm.toggleGroup = toggleGroup;
  vm.typeClass = typeClass;
  vm.prevDate = prevDate;
  vm.nextDate = nextDate;
  vm.currentDate = currentDate;
  vm.betResume = betResume;
  vm.getColorBetStatus = getColorBetStatus;

	/* Initialization */
	init();

	/**********/

	function init() {
		vm.sellerId = $stateParams.seller;
		vm.groupId = $stateParams.group;
		vm.currentDate($stateParams.initialDate);
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

		FinancialService.getBets(initialDate, finalDate, vm.sellerId, vm.groupId).then(
			function(data) {
				vm.sellers = data.dados;
				vm.resume = data.resume;
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

	function betResume(bet) {
		$state.go('app.betResume', {betHash: bet.hash});
	}

	function getColorBetStatus(status) {
		if(status.toLowerCase() == 'errou'){
			return 'red';
		} else {
			return 'green';
		}
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

  function currentDate(initialDate) {

		var date = new Date();
		
  	if(initialDate) {
  		date = initialDate;
  	}

		setDates(date);
  }
});