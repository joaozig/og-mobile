describe('BetController', function() {

	var controller;
	var betServiceMock;
	var ionicPopupMock;
	var deferredConfirm;
	var $rootScope;
	var betMock = new Bet({
		playerName: 'Player',
		betAmount: 100,
		tickets: [{id: 1, name: '1 gol', tax: 2.5, ticketType: new TicketType()}]
	});

	beforeEach(module('bet'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredConfirm = $q.defer();
		$rootScope = _$rootScope_;

		// mock BetService
		betServiceMock = {
			getBet: jasmine.createSpy('getBet spy').and.returnValue(betMock),
			removeTicket: jasmine.createSpy('removeTicket spy').and.returnValue(true)
		};
    // mock $ionicPopup
    ionicPopupMock = {
    	alert: jasmine.createSpy('alert spy'),
    	confirm: jasmine.createSpy('confirm spy').and.returnValue(deferredConfirm.promise)
    }

		controller = $controller('BetController', {
			$ionicPopup: ionicPopupMock,
			BetService: betServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have a bet object from BetService', function() {
			expect(controller.bet).toEqual(betMock);
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