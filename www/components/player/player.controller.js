angular.module('player')

.controller('PlayerController', function($state, $ionicHistory, $ionicPopup, BetService) {

	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;
	vm.playerName = '';
	vm.betAmount = '';

	/* Public Methods */
	vm.addBet = addBet;
	vm.saveBet = saveBet;
	vm.removeBet = removeBet;

	/* Initialization */
	init();

	/********/
	function init() {
		vm.bet = BetService.getBet();
	}

	function addBet() {
		BetService.checkLimit(vm.betAmount).then(
			function(data) {
				if(data.user.success) {
					vm.saveBet();
				} else {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: data.user.message
					});
				}
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}

	function saveBet() {
		BetService.addBet(vm.playerName, vm.betAmount).then(
			function(bet) {
				vm.bet = bet;
				var backView = $ionicHistory.backView();
				if(backView) {
					$ionicHistory.goBack();
				} else {
				  $ionicHistory.nextViewOptions({disableBack: true});
				  $state.go('app.main');
				}
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}

	function removeBet() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Excluir Aposta',
			template: 'Você deseja realmente excluir a aposta?'
		});

		confirmPopup.then(function(confirmed) {
			if(confirmed) {
				if(BetService.removeBet()) {
					vm.bet = null;
					vm.playerName = '';
					vm.betAmount = '';
				} else {
						$ionicPopup.alert({
							title: 'Algo falhou :(',
							template: 'Não foi possível excluir a aposta'
						});
				}
			}
		});
	}
});