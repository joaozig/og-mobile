angular.module('bet')

.controller('BetController', function($scope, $state, $ionicPopup, $ionicModal, BetService) {
	var vm = this;
	vm.util = new Util();

  $ionicModal.fromTemplateUrl('components/bet/edit.html', {
    scope: $scope,
    animation: 'slide-in-up',
    controller: 'BetController as ctrl'
  }).then(function(modal) {
    vm.editBetModal = modal;
  });

	/* Properties */
	vm.bet = null;
	vm.playerName = '';
	vm.betAmount = '';
	vm.showEndedBetButton = false;

	/* Public Methods */
	vm.openEditBetModal = openEditBetModal;
	vm.closeEditBetModal = closeEditBetModal;
	vm.editBet = editBet;
	vm.finishBet = finishBet;
	vm.removeTicket = removeTicket;

	/* Initialization */
	init();

	/*********/
	function init() {
		_setBet();
		_setEditBetFields();
	}

	function openEditBetModal() {
		vm.editBetModal.show();
	}

	function closeEditBetModal() {
		vm.editBetModal.hide().then(function() {
			_setEditBetFields();
		});
	}

	function editBet() {
		BetService.editBet(vm.playerName, vm.betAmount).then(
			function(bet) {
				_setBet();
				vm.closeEditBetModal();
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}

	function finishBet() {
		var bet = null;
		var confirmPopup = $ionicPopup.confirm({
			title: 'Finalizar Aposta',
			template: 'Você deseja realmente finalizar a aposta?'
		});

		confirmPopup.then(function(confirmed) {
			if(confirmed) {
				if(bet = BetService.finishBet()) {
					$state.go('app.finishedBet', {betId: bet.id});
				} else {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: 'Não foi possível finalizar a aposta.'
					});
				}
			}
		});
	}

	function removeTicket(ticketId) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Remover Palpite',
			template: 'Você deseja realmente remover o palpite da aposta?'
		});

		confirmPopup.then(function(confirmed) {
			if(confirmed) {
				if(BetService.removeTicket(ticketId)) {
					_setBet();
				} else {
					$ionicPopup.alert({
						title: 'Algo falhou :(',
						template: 'Não foi possível remover o palpite da aposta'
					});
				}
			}
		});
	}

	/* Private Methods */

	function _setBet() {
		vm.bet = BetService.getBet();
		vm.showEndedBetButton = (vm.bet.tickets.length > 0);
	}

	function _setEditBetFields() {
		vm.playerName = vm.bet.playerName;
		vm.betAmount = vm.bet.betAmount;
	}
});