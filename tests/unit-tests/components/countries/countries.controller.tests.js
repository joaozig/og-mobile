describe('CountriesController', function() {

	var controller;
	var deferredMain;
	var stateParamsMock;
	var mainServiceMock;
	var ionicPopupMock;
	var $rootScope;

	beforeEach(module('countries'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredMain = $q.defer();
		$rootScope = _$rootScope_;

		//mock $stateParams
		stateParamsMock = { sportId: 1 };
		// mock MainService
		mainServiceMock = {
			getSport: jasmine.createSpy('main spy').and.returnValue(deferredMain.promise)
		};
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

		controller = $controller('CountriesController', {
			$stateParams: stateParamsMock,
			$ionicPopup: ionicPopupMock,
			MainService: mainServiceMock
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
  });
});