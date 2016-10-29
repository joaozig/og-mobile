describe('LoginController', function() {

	var controller;
	var deferredLogin;
	var loginServiceMock;
	var $rootScope;

	beforeEach(module('login'));

	beforeEach(inject(function($controller, $q) {
		deferredLogin = $q.defer();

		loginServiceMock = {
			login: jasmine.createSpy('login spy').and.returnValue(deferredLogin.promise)
		};

		controller = $controller('LoginController', {LoginService: loginServiceMock});
	}));

  describe('Initialization', function() {
		it('should have an empty user', function() {
			expect(controller.user).toEqual({username: '', password: ''});
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
	  	xit('if successful, should return the username', function() {
	  		/* PENDING */
	  		// deferredLogin.resolve();
	  		// $rootScope.$digest();
	  	});

	  	xit('if unsuccessful, should show a popup', function() {
	  		/* PENDING */
	  		// deferredLogin.reject();
	  		// $rootScope.$digest();
	  	});
	  });
  });
});