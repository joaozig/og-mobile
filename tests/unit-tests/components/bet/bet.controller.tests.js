describe('BetController', function() {

	var controller;
	var betServiceMock;
	var ionicPopupMock;
	var ionicModalMock;
	var stateMock;
	var deferredBet;
	var deferredConfirm;
	var deferredModal;
	var $rootScope;
	var betMock = new Bet({
		playerName: 'Player',
		betAmount: 100,
		tickets: [{id: 1, name: '1 gol', tax: 2.5, ticketType: new TicketType()}]
	});

	beforeEach(module('bet'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredBet = $q.defer();
		deferredConfirm = $q.defer();
		deferredModal = $q.defer();
		$rootScope = _$rootScope_;

		// mock BetService
		betServiceMock = {
			getBet: jasmine.createSpy('getBet spy').and.returnValue(betMock),
			editBet: jasmine.createSpy('editBet spy').and.returnValue(deferredBet.promise),
			finishBet: jasmine.createSpy('finishBet spy').and.returnValue({id: 1}),
			removeTicket: jasmine.createSpy('removeTicket spy').and.returnValue(true)
		};
    // mock $ionicModal
    ionicModalMock = {
    	fromTemplateUrl: jasmine.createSpy('fromTemplateUrl spy').and.returnValue(deferredModal.promise),
    	show: jasmine.createSpy('show spy'),
    	hide: jasmine.createSpy('hide spy').and.returnValue(deferredModal.promise)
    }
    // mock $ionicPopup
    ionicPopupMock = {
    	alert: jasmine.createSpy('alert spy'),
    	confirm: jasmine.createSpy('confirm spy').and.returnValue(deferredConfirm.promise)
    }
    // mock $state
		stateMock = jasmine.createSpyObj('$state spy', ['go']);

		controller = $controller('BetController', {
			$scope: $rootScope,
			$state: stateMock,
			$ionicModal: ionicModalMock,
			$ionicPopup: ionicPopupMock,
			BetService: betServiceMock
		});
		deferredModal.resolve(ionicModalMock);
		$rootScope.$digest();
	}));

  describe('Initialization', function() {
		it('should have a bet object from BetService', function() {
			expect(controller.bet).toEqual(betMock);
		});

		it('should have a editBetModal', function() {
			expect(controller.editBetModal).toEqual(ionicModalMock);
		});

		it('should have a playerName equals to bet.playerName', function() {
			expect(controller.playerName).toEqual(controller.bet.playerName);
		});

		it('should have a betAmount equals to bet.betAmount', function() {
			expect(controller.betAmount).toEqual(controller.bet.betAmount);
		});

		it('should not show endedBet button', function() {
			expect(controller.showEndedBetButton).toBeTruthy();
		});

		describe('when the init is executed', function() {
			describe('at BetService#getBet', function() {
		  	it('if there is a bet, should return the bet object', function() {
		  		expect(betServiceMock.getBet).toHaveBeenCalled();
		  	});
			});
		});
  });

  describe('#openEditBetModal', function() {
  	beforeEach(function() {
  		controller.openEditBetModal();
  	});

  	it('should open the EditBet modal', function() {
  		$rootScope.$digest();
  		expect(controller.editBetModal.show).toHaveBeenCalled();
  	});
  });

  describe('#closeEditBetModal', function() {
  	beforeEach(function() {
  		controller.closeEditBetModal();
  	});

  	it('should close the EditBet modal', function() {
  		$rootScope.$digest();
  		expect(controller.editBetModal.hide).toHaveBeenCalled();
  	});
  });

  describe('#editBet', function() {
  	beforeEach(function() {
  		controller.editBet();
  	});

  	describe('when it successful', function() {
  		it('should set bet and retrieve bet from BetService and close EditBet modal', function() {
	  		deferredBet.resolve(betMock);
	  		$rootScope.$digest();
	  		expect(controller.bet).toEqual(betMock);
	  		expect(betServiceMock.getBet).toHaveBeenCalled();
	  		expect(controller.editBetModal.hide).toHaveBeenCalled();
  		});
  	});
  	describe('when it unsuccessful', function() {
  		it('should show a popup with error message', function() {
	  		deferredBet.reject('error message');
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalledWith({
					title: 'Algo falhou :(',
					template: 'error message'
				});
  		});
  	});
  });

  describe('#finishBet', function() {
  	beforeEach(function() {
  		controller.finishBet();
			deferredConfirm.resolve(true);
  	});

  	it('should open a confirm popup', function() {
  		expect(ionicPopupMock.confirm).toHaveBeenCalledWith({
				title: 'Finalizar Aposta',
				template: 'Você deseja realmente finalizar a aposta?'
			});
  	});

  	describe('when successful', function() {
  		beforeEach(function() {
				$rootScope.$digest();
  		});

  		it('should redirect to FinishedBet page', function() {
  			expect(stateMock.go).toHaveBeenCalledWith('app.finishedBet', {betId: 1});
  		});
  	});

  	describe('when unsuccessful', function() {
  		beforeEach(function() {
				betServiceMock.finishBet = jasmine.createSpy('finishBet spy').and.returnValue(null);
				$rootScope.$digest();
  		});

  		it('should show a popup with error', function() {
	  		expect(ionicPopupMock.alert).toHaveBeenCalledWith({
					title: 'Algo falhou :(',
					template: 'Não foi possível finalizar a aposta.'
				});
  		});
  	});
  });

  describe('#removeTicket', function() {
  	beforeEach(function() {
  		controller.removeTicket(1);
  	});

  	it('should open a confirm popup', function() {
  		$rootScope.$digest();
  		expect(ionicPopupMock.confirm).toHaveBeenCalledWith({
				title: 'Remover Palpite',
				template: 'Você deseja realmente remover o palpite da aposta?'
			});
  	});

  	describe('when it successful', function() {
  		it('should reset local bet', function() {
				betServiceMock.getBet = jasmine.createSpy('getBet spy').and.returnValue(new Bet());
	  		deferredConfirm.resolve(true);
	  		$rootScope.$digest();
	  		expect(betServiceMock.getBet).toHaveBeenCalled();
	  		expect(controller.showEndedBetButton).toBeFalsy();
  		});
  	});
  	describe('when it unsuccessful', function() {
  		it('should show a popup with error message', function() {
				// mock BetService
				betServiceMock.removeTicket = jasmine.createSpy('removeTicket spy').and.returnValue(false);
	  		deferredConfirm.resolve(true);
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalledWith({
					title: 'Algo falhou :(',
					template: 'Não foi possível remover o palpite da aposta'
				});
  		});
  	});
  });
});