describe('CountriesController', function() {

	var controller;
	var deferredMain;
	var deferredCountries;
	var stateParamsMock;
	var mainServiceMock;
	var countriesServiceMock;
	var ionicPopupMock;
	var $rootScope;

	beforeEach(module('countries'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredMain = $q.defer();
		deferredCountries = $q.defer();
		$rootScope = _$rootScope_;

		//mock $stateParams
		stateParamsMock = { sportId: 1 };
		// mock MainService
		mainServiceMock = {
			getSport: jasmine.createSpy('main spy').and.returnValue(deferredMain.promise)
		};
		// mock MainService
		countriesServiceMock = {
			getCountries: jasmine.createSpy('countries spy').and.returnValue(deferredCountries.promise)
		};
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

		controller = $controller('CountriesController', {
			$stateParams: stateParamsMock,
			$ionicPopup: ionicPopupMock,
			MainService: mainServiceMock,
			CountriesService: countriesServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have an empty sport object', function() {
			expect(controller.sport).toEqual({});
		});

		it('should have an empty countries list', function() {
			expect(controller.countries).toEqual([]);
		});

		describe('when the init is executed', function() {
			describe('at MainService#getSport', function() {
		  	it('if successful, should return a sport object', function() {
		  		deferredMain.resolve();
		  		$rootScope.$digest();
		  		expect(mainServiceMock.getSport).toHaveBeenCalled();
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredMain.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});

			describe('at CountriesService#getCountries', function() {
	  		it('if successful, should return a countries list', function() {
		  		deferredCountries.resolve();
		  		$rootScope.$digest();
		  		expect(countriesServiceMock.getCountries).toHaveBeenCalled();
		  	});

		  	it('if unsuccessful, should show a popup', function() {
		  		deferredCountries.reject();
		  		$rootScope.$digest();
		  		expect(ionicPopupMock.alert).toHaveBeenCalled();
		  	});
			});
		});
  });
});