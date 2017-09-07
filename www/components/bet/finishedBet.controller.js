angular.module('bet')

.controller('FinishedBetController', function($ionicHistory, $stateParams, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;
	vm.hideLoadingSpinner = false;
	vm.showContent = false;
	vm.pairedDevices = [];
	vm.unpairedDevices = [];

	/* Public Methods */
	vm.newBet = newBet;
	vm.loadDevices = loadDevices;
	vm.selectDevice = selectDevice;

	/* Initialization */
	init();

	/*********/
	function init() {
		bluetoothSerial.enable();

		$ionicHistory.removeBackView();
		BetService.getFinishedBet($stateParams.betHash).then(
			function(data) {
				vm.bet = data;
				vm.hideLoadingSpinner = true;
				vm.loadDevices();
			},
			function(errorMessage) {
				console.log(errorMessage);
			}
		);
	}

	function newBet() {
		$ionicHistory.goBack();
	}

	function loadDevices() {
		bluetoothSerial.discoverUnpaired(function(devices) {
			vm.unpairedDevices = devices;
		}, function(error) {
			console.log('erro unpaired devices');
			console.log(error);
		});

		bluetoothSerial.list(function(devices) {
			vm.pairedDevices = devices;
		}, function(error) {
			console.log('erro paired devices');
			console.log(error);
		});
	}

	function selectDevice(address) {
		bluetoothSerial.connect(address);
		vm.showContent = true;
		setTimeout(function() {
			var page = window.document.getElementById('print');
			window.cordova.plugins.printer.print(page, 'Document.html');
		}, 1500);
	}
});