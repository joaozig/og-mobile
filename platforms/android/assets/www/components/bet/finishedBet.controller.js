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
		var arr="";
		var cont=0;
		var aposta="";
		var premio=vm.bet.jackpot;
		angular.forEach(vm.bet.tickets, function(item, index) {
				arr = arr+item.ticketType.game.teamA.name+' x '+item.ticketType.game.teamB.name+'\n'+item.ticketType.game.date+'\nPalpite: '+item.name+'\n'+item.ticketType.name+'\n--------------------------------\n';
				cont++;
		});
		
		//aposta = number_format(vm.bet.betAmount, 2, ',', '.');
		premio = vm.util.number_format(premio, 2);
		alert(premio);
		//premio = vm.bet.jackpot;
		bluetoothSerial.connect(address, 
			function(success){ 
				//alert('conectou com sucesso');
				bluetoothSerial.write(
			'29/08/2017           2 Via 20:51\n'+
			'  \n'+			
			premio+'\n'+
			' \n \n \n',
					function(success) {
						alert('escreveu');
						bluetoothSerial.disconnect()
						$state.go('app.main');
					}, function(error) {
						alert('erro ao escrever')
						alert(error)
					}
				);
			}, 
			function(error){
					alert('erro ao conectar'); 
					alert(error);
			});
		}

		// setTimeout(function() {
		// 	var page = window.document.getElementById('print');
		// 	window.cordova.plugins.printer.print(page, 'Document.html');
		// }, 1500);
	
});