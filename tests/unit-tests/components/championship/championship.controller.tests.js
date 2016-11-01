describe('ChampionshipController', function() {

	var controller;
	var deferredCountries;
	var deferredChampionship;
	var stateParamsMock;
	var countriesServiceMock;
	var championshipServiceMock;
	var ionicPopupMock;
	var $rootScope;

	beforeEach(module('championship'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredCountries = $q.defer();
		deferredChampionship = $q.defer();
		$rootScope = _$rootScope_;

		//mock $stateParams
		stateParamsMock = { countryId: 1 };
		// mock CountriesService
		countriesServiceMock = {
			getCountry: jasmine.createSpy('countries spy').and.returnValue(deferredCountries.promise)
		};
		// mock ChampionshipService
		championshipServiceMock = {
			getChampionships: jasmine.createSpy('championship spy').and.returnValue(deferredChampionship.promise)
		};
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

		controller = $controller('ChampionshipController', {
			$stateParams: stateParamsMock,
			$ionicPopup: ionicPopupMock,
			CountriesService: countriesServiceMock,
			ChampionshipService: championshipServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have an empty country object', function() {
			expect(controller.country).toEqual({});
		});

		it('should have an empty championships list', function() {
			expect(controller.championships).toEqual([]);
		});

		describe('when the init is executed', function() {
			describe('at CountriesService#getCountry', function() {
		  	it('if successful, should return a country object', function() {
		  		deferredCountries.resolve();
		  		$rootScope.$digest();
		  		expect(countriesServiceMock.getCountry).toHaveBeenCalled();
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredCountries.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});

			describe('at ChampionshipService#getChampionships', function() {
	  		it('if successful, should return a championships list', function() {
		  		deferredChampionship.resolve();
		  		$rootScope.$digest();
		  		expect(championshipServiceMock.getChampionships).toHaveBeenCalled();
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredChampionship.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});
		});
  });
});