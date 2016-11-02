describe('GameController', function() {

	var controller;
	var deferredChampionship;
	var deferredGame;
	var stateParamsMock;
	var championshipServiceMock;
	var gameServiceMock;
	var ionicPopupMock;
	var $rootScope;

	beforeEach(module('game'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredChampionship = $q.defer();
		deferredGame = $q.defer();
		$rootScope = _$rootScope_;

		//mock $stateParams
		stateParamsMock = { championshipId: 1 };
		// mock ChampionshipService
		championshipServiceMock = {
			getChampionship: jasmine.createSpy('championship spy').and.returnValue(deferredChampionship.promise)
		};
		// mock GameService
		gameServiceMock = {
			getGames: jasmine.createSpy('game spy').and.returnValue(deferredGame.promise)
		};
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

		controller = $controller('GameController', {
			$stateParams: stateParamsMock,
			$ionicPopup: ionicPopupMock,
			ChampionshipService: championshipServiceMock,
			GameService: gameServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have an empty championship object', function() {
			expect(controller.championship).toEqual({});
		});

		it('should have an empty games list', function() {
			expect(controller.games).toEqual([]);
		});

		describe('when the init is executed', function() {
			describe('at ChampionshipService#getChampionship', function() {
		  	it('if successful, should return a championship object', function() {
		  		deferredChampionship.resolve();
		  		$rootScope.$digest();
		  		expect(championshipServiceMock.getChampionship).toHaveBeenCalledWith(stateParamsMock.championshipId);
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredChampionship.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});

			describe('at GameService#getGames', function() {
	  		it('if successful, should return a games list', function() {
		  		deferredGame.resolve();
		  		$rootScope.$digest();
		  		expect(gameServiceMock.getGames).toHaveBeenCalled();
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredGame.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});
		});
  });
});