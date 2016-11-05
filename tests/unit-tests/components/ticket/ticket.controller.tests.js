describe('TicketController', function() {

	var controller;
	var deferredGame;
	var deferredTicket;
	var deferredConfirm;
	var stateParamsMock;
	var gameServiceMock;
	var ticketServiceMock;
	var ionicPopupMock;
	var $rootScope;

	beforeEach(module('ticket'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredGame = $q.defer();
		deferredTicket = $q.defer();
		deferredConfirm = $q.defer();
		$rootScope = _$rootScope_;

		//mock $stateParams
		stateParamsMock = { gameId: 1 };
		// mock GameService
		gameServiceMock = {
			getGame: jasmine.createSpy('game spy').and.returnValue(deferredGame.promise)
		};
		// mock TicketService
		ticketServiceMock = {
			getTicketTypes: jasmine.createSpy('ticketTypes spy').and.returnValue(deferredTicket.promise)
		};
		// mock TicketService
		betServiceMock = {
			addTicket: jasmine.createSpy('ticketTypes spy').and.returnValue(true)
		};
		// mock $ionicPopup
		ionicPopupMock = {
			alert: jasmine.createSpy('alert spy'),
			confirm: jasmine.createSpy('confirm spy').and.returnValue(deferredConfirm.promise)
		};

		controller = $controller('TicketController', {
			$stateParams: stateParamsMock,
			$ionicPopup: ionicPopupMock,
			GameService: gameServiceMock,
			TicketService: ticketServiceMock,
			BetService: betServiceMock,
		});
	}));

  describe('Initialization', function() {
		it('should have an empty game object', function() {
			expect(controller.game).toEqual({});
		});

		it('should have an empty ticketType list', function() {
			expect(controller.ticketTypes).toEqual([]);
		});

		describe('when the init is executed', function() {
			describe('at GameService#getGame', function() {
		  	it('if successful, should return a game object', function() {
		  		deferredGame.resolve();
		  		$rootScope.$digest();
		  		expect(gameServiceMock.getGame).toHaveBeenCalledWith(stateParamsMock.gameId);
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredGame.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});

			describe('at TicketService#getTicketTypes', function() {
	  		it('if successful, should return a ticketType list', function() {
		  		deferredTicket.resolve();
		  		$rootScope.$digest();
		  		expect(ticketServiceMock.getTicketTypes).toHaveBeenCalledWith(stateParamsMock.gameId);
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredTicket.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});
		});
  });

  describe('#addTicketToBet', function() {
  	beforeEach(function() {
  		var ticket = new Ticket({id: 1, name: '1 gol', tax: 2.5, ticketType: new TicketType()});
  		controller.addTicketToBet(ticket);
  	});

  	it('should open a confirm popup', function() {
  		$rootScope.$digest();
  		expect(ionicPopupMock.confirm).toHaveBeenCalled();
  	});

  	describe('when it successful', function() {
  		it('should add ticket to bet', function() {
	  		deferredConfirm.resolve(true);
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalledWith(
	  			{
						title: 'Sucesso! :)',
						template: 'Palpite adicionado com sucesso!'
					}
				);
  		});
  	});
  	describe('when it unsuccessful', function() {
  		it('should show a popup with error message', function() {
				// mock BetService
				betServiceMock.addTicket = jasmine.createSpy('addTicket spy').and.returnValue(false);
	  		deferredConfirm.resolve(true);
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalledWith(
					{
						title: 'Algo falhou :(',
						template: 'Não foi possível adicionar o palpite'
					}
	  		);
  		});
  	});
  });
});