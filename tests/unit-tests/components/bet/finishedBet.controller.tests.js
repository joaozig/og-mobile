describe('FinishedBetController', function() {

	var controller;
	var betServiceMock;
	var ionicHistoryMock;
	var stateParamsMock;

	var betMock = new Bet({
		id: 1,
		playerName: 'Player',
		betAmount: 100,
		tickets: [{id: 1, name: '1 gol', tax: 2.5, ticketType: new TicketType()}]
	});

	beforeEach(module('bet'));

	beforeEach(inject(function($controller, $q) {

		// mock BetService
		betServiceMock = {
			getFinishedBet: jasmine.createSpy('getBet spy').and.returnValue(betMock)
		};
		// mock ionicHistory
		ionicHistoryMock = jasmine.createSpyObj('$ionicHistory spy', ['removeBackView', 'goBack']);
    // mock $stateParams
		stateParamsMock = {betId: 1}

		controller = $controller('FinishedBetController', {
			$ionicHistory: ionicHistoryMock,
			$stateParams: stateParamsMock,
			BetService: betServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have a bet object from BetService', function() {
			expect(controller.bet).toEqual(betMock);
		});

		describe('when the init is executed', function() {

			it('should remove back view', function() {
				expect(ionicHistoryMock.removeBackView).toHaveBeenCalled();
			});

			describe('at BetService#getFinishedBet', function() {
		  	it('if there is a bet, should return the bet object', function() {
		  		expect(betServiceMock.getFinishedBet).toHaveBeenCalledWith(stateParamsMock.betId);
		  	});
			});
		});
  });

  describe('#newBet', function() {
  	beforeEach(function() {
  		controller.newBet();
  	});

  	it('should go back to Player page', function() {
  		expect(ionicHistoryMock.goBack).toHaveBeenCalled();
  	});
  });
});