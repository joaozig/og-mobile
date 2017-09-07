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
		bluetoothSerial.connect(address, function(success){ alert('conectou com sucesso')}, function(error){alert('erro ao conectar'); alert(error);}).subscribe(function(){
			alert('sucesso no subscribe!')
			vm.showContent = true;
	    bluetoothSerial.write(
			'29/08/2017           2 Via 20:51\n'+
			'  \n'+
			'          * WORLDBETS *         \n'+
			'  \n'+
			'================================\n'+
			'Cliente: NOME DO CLIENTE QUE E UM NOME GRANDE\n'+
			'Vendedor: NOME DO VENDEDOR\n'+
			'Data/Hora: 29/08/2017 20:52\n'+
			'Codigo: 98S7S8DF7SD9F89S87F\n'+
			'================================\n'+
			'            PALPITES            \n'+
			'--------------------------------\n'+
			'Palmeiras 5 x 0 Sao Paulo\n'+
			'20/08/2017 - 19:05 \n'+
			'Palpite: VENCEDOR DO JOGO\n'+
			'* Palmeiras x 1.29\n'+
			'                         [ERROU]\n'+
			'--------------------------------\n'+
			'Palmeiras 5 x 0 Sao Paulo\n'+
			'20/08/2017 - 19:05 \n'+
			'Palpite: DUPLA CHANCE\n'+
			'* Palmeiras ou empate x 2.25\n'+
			'                       [ACERTOU]\n'+
			'--------------------------------\n'+
			'Palmeiras 5 x 0 Sao Paulo\n'+
			'20/08/2017 - 19:05 \n'+
			'Palpite: DUPLA CHANCE\n'+
			'* Palmeiras ou empate x 2.25\n'+
			'                      [PENDENTE]\n'+
			'================================\n'+
			'Valor da aposta: R$ 5,00\n'+
			'Palpites: 2\n'+
			'Premio Possivel: R$ 50,00\n'+
			'--------------------------------\n'+
			'* Sera considerado somente o \n'+
			'resultado dos 90 minutos de jogo\n'+
			'e acrescimos.\n'+
			'* Prorrogacao e penaltis sao \n'+
			'ignorados.\n'+
			'* Premio valido somente com a \n'+
			'apresentacao deste bilhete.\n'+
			'\n'+
			'\n'+
			'________________________________\n'+
			'    NOME DO VENDEDOR\n'+
			' \n \n \n',
			function(success) {
				alert('escreveu com sucesso');
			}, function(error) {
				alert('erro ao escrever')
				alert(error)
			});
		}, function(error) {
			alert('erro no subscribe.');
			alert(error);
		});

		// setTimeout(function() {
		// 	var page = window.document.getElementById('print');
		// 	window.cordova.plugins.printer.print(page, 'Document.html');
		// }, 1500);
	}
});