describe('MainController', function() {

	var controller;
	var deferredMain;
	var mainServiceMock;
	var ionicPopupMock;
	var $rootScope;

	beforeEach(module('main'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredMain = $q.defer();
		$rootScope = _$rootScope_;

		// mock MainService
		mainServiceMock = {
			getSports: jasmine.createSpy('main spy').and.returnValue(deferredMain.promise)
		};
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

		controller = $controller('MainController', {
			$ionicPopup: ionicPopupMock,
			MainService: mainServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have an empty sports list', function() {
			expect(controller.sports).toEqual([]);
		});

		describe('when the init is executed', function() {
	  	it('if successful, should return the sports list', function() {
	  		deferredMain.resolve();
	  		$rootScope.$digest();
	  		expect(mainServiceMock.getSports).toHaveBeenCalled();
	  	});

	  	it('if unsuccessful, should show a popup', function() {
	  		deferredMain.reject();
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalled();
	  	});
		});
  });
});