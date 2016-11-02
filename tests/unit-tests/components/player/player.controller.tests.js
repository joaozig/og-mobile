describe('PlayerController', function() {

	var controller;
	var deferredBet;
	var betServiceMock;
	var $rootScope;
	var betMock = {
		playerName: 'Player Name',
		betAmount: 100.50,
		bets: 2
	};

	beforeEach(module('player'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredBet = $q.defer();
		$rootScope = _$rootScope_;

		// mock betServiceWithBet
		// betServiceMock = {
		// 	getBetSuccess: jasmine.createSpy('withBet spy').and.returnValue(betMock),
		// 	getBetFailed: jasmine.createSpy('withoutBet spy').and.returnValue(null)
		// };
		betServiceMock = {
			getBet: jasmine.createSpy('withBet spy').and.returnValue(betMock),
		};

		controller = $controller('PlayerController', {
			BetService: betServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have a bet object from BetService', function() {
			expect(controller.bet).toEqual(betMock);
		});

		describe('when the init is executed', function() {
			describe('at BetService#getBet', function() {
		  	it('if there is a bet, should return the bet object', function() {
		  		$rootScope.$digest();
		  		expect(betServiceMock.getBet).toHaveBeenCalled();
		  	});
			});
		});
  });
});