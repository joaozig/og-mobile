describe('PlayerController', function() {

	var controller;
	var deferredBet;
	var betServiceMock;
	var stateMock;
	var ionicPopupMock;
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

		// mock BetService
		betServiceMock = {
			getBet: jasmine.createSpy('getBet spy').and.returnValue(betMock),
			addBet: jasmine.createSpy('addBet spy').and.returnValue(deferredBet.promise)
		};
    // mock $state
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

		controller = $controller('PlayerController', {
			$state: stateMock,
			$ionicPopup: ionicPopupMock,
			BetService: betServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have an empty playerName', function() {
			expect(controller.playerName).toEqual('');
		});

		it('should have an empty betAmount', function() {
			expect(controller.betAmount).toEqual('');
		});

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

  describe('#addBet', function() {
  	beforeEach(function() {
  		controller.addBet();
  	});

  	describe('when it successful', function() {
  		it('should redirect to Main page', function() {
	  		deferredBet.resolve(betMock);
	  		$rootScope.$digest();
	  		expect(controller.bet).toEqual(betMock);
  		});
  	});
  	describe('when it unsuccessful', function() {
  		it('should show a popup with error message', function() {
	  		deferredBet.reject();
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalled();
  		});
  	});
  });
});