angular.module('financial')

.controller('FinancialController', function($ionicPopup, FinancialService) {

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
  vm.getMonday = getMonday;
  vm.getSunday = getSunday;
  vm.formatDate = formatDate;
  vm.prevDate = prevDate;
  vm.nextDate = nextDate;

	/* Initialization */
	init();

	/**********/

	function init() {
		var date = new Date();
		setDates(date);
	}

	function loadTypes() {
		vm.hideLoadingSpinner = false;

		var initialDate = formatFilterDate(vm.initialDate);
		var finalDate = formatFilterDate(vm.finalDate);

		FinancialService.getBets(initialDate, finalDate).then(
			function(data) {
				var types = [data[0], data[1], data[2]];
				var resume = data[3];
				vm.types = types;
				vm.resume = resume.resume[0];
				console.log(vm.resume)
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

	function setDates(date) {
		vm.initialDate = vm.getMonday(date);
		vm.finalDate = vm.getSunday(date);
		vm.loadTypes();
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

	function getMonday(d) {
	  var d = new Date(d);
	  var day = d.getDay();
	  var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	  return new Date(d.setDate(diff));
	}

	function getSunday(d) {
	  var d = new Date(d);
	  var day = d.getDay();
	  var diff = (d.getDate() - day) + 7
	  return new Date(d.setDate(diff));
	}

	function formatDate(date) {
		var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
		var day = date.getDate();
		if(day <= 9) {
			day = '0' + day;
		}
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		return day + '/' + monthNames[monthIndex] + '/' + year;
	}

	function formatFilterDate(date) {
		var day = date.getDate();
		if(day <= 9) {
			day = '0' + day;
		}

		var month = date.getMonth() + 1;
		if(month <= 9) {
			month = '0' + month;
		}

		var year = date.getFullYear();

		return year+'-'+month+'-'+day
	}
});