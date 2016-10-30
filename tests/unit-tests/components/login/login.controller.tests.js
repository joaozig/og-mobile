describe('LoginController', function() {

	var controller;
	var deferredLogin;
	var loginServiceMock;
	var stateMock;
	var ionicPopupMock;
	var ionicHistoryMock;
	var $rootScope;

	beforeEach(module('login'));

	beforeEach(inject(function($controller, $q) {
		deferredLogin = $q.defer();

		// mock LoginService
		loginServiceMock = {
			login: jasmine.createSpy('login spy').and.returnValue(deferredLogin.promise)
		};

    // mock $state
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
    // mock $ionicHistory
    ionicHistoryMock = jasmine.createSpyObj('$ionicHistory spy', ['nextViewOptions']);

		controller = $controller('LoginController', {
			$state: stateMock,
			$ionicPopup: ionicPopupMock,
			$ionicHistory: ionicHistoryMock,
			LoginService: loginServiceMock
		});
	}));

  describe('Initialization', function() {
		it('should have an empty user', function() {
			expect(controller.user).toEqual({username: '', password: ''});
		});

		it('should disable Back Button history navigation', function() {
 			expect(ionicHistoryMock.nextViewOptions).toHaveBeenCalledWith({disableBack: true});
		});
  });

  describe('#doLogin', function() {
  	var username = 'username';
  	var password = 'password';

		beforeEach(inject(function(_$rootScope_) {
			$rootScope = _$rootScope_;
			controller.user.username = username;
			controller.user.password = password;
			controller.doLogin();
		}));

	  it('should call login on LoginService', function() {
	      expect(loginServiceMock.login).toHaveBeenCalledWith(username, password); 
	  });

	  describe('when the login is executed', function() {
	  	it('if successful, should return the username', function() {
	  		deferredLogin.resolve();
	  		$rootScope.$digest();
	  		expect(stateMock.go).toHaveBeenCalledWith('app.main');
	  	});

	  	it('if unsuccessful, should show a popup', function() {
	  		deferredLogin.reject();
	  		$rootScope.$digest();
	  		expect(ionicPopupMock.alert).toHaveBeenCalled();
	  	});
	  });
  });
});