angular.module('bet')

.controller('FinishedBetController', function($ionicHistory, $stateParams, BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;
	vm.hideLoadingSpinner = false;

	/* Public Methods */
	vm.newBet = newBet;

	/* Initialization */
	init();

	/*********/
	function init() {
		$ionicHistory.removeBackView();
		BetService.getFinishedBet($stateParams.betHash).then(
			function(data) {
				vm.bet = data;
				vm.hideLoadingSpinner = true;
			},
			function(errorMessage) {
				console.log(errorMessage);
			}
		);
		setTimeout(function(){
			var page = window.document.getElementById('print');
			window.cordova.plugins.printer.print(page, 'Document.html');
		}, 1500);
	}

	function newBet() {
		$ionicHistory.goBack();
	}
});