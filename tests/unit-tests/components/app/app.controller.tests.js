describe('AppController', function() {

	var controller;
	var stateMock;
	var ionicPopupMock;
	var deferredConfirm;
	var $rootScope;

	beforeEach(module('app'));

	beforeEach(inject(function(_$rootScope_, $controller, $q) {
		deferredConfirm = $q.defer();
		$rootScope = _$rootScope_;

    // mock $state
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    // mock $ionicPopup
    ionicPopupMock = {
    	confirm: jasmine.createSpy('confirm spy').and.returnValue(deferredConfirm.promise)
    }

		controller = $controller('AppController', {$state: stateMock, $ionicPopup: ionicPopupMock});
	}));

  describe('#doLogout', function() {
  	beforeEach(function() {
			controller.doLogout();
  	});

		it('should open a confirm alert', function() {
			$rootScope.$digest();
			expect(ionicPopupMock.confirm).toHaveBeenCalledWith({
      	title: 'Sair',
      	template: 'Você deseja realmente sair?'
    	});
		});

		describe('when confirmed', function() {
			beforeEach(function() {
				deferredConfirm.resolve(true);
				$rootScope.$digest();
			});

		  it('should reset logged user', function() {
		  	window.localStorage.setItem('user', {name: 'Lorem Ipsum'});
		  	window.localStorage.removeItem('user');
				expect(window.localStorage.getItem('user')).toEqual(null);
		  });

		  it('should redirect to login page', function() {
				expect(stateMock.go).toHaveBeenCalledWith('app.login');
		  });
		});

		describe('when canceled', function() {
			beforeEach(function() {
				deferredConfirm.resolve(false);
				$rootScope.$digest();
			});

			it('should not reset logged user', function() {
				window.localStorage.setItem('user', JSON.stringify({name: 'Lorem Ipsum'}));
				expect(JSON.parse(window.localStorage.getItem('user'))).toEqual({name: 'Lorem Ipsum'});
			});

			it('should not redirect to login page', function() {
				expect(stateMock.go).not.toHaveBeenCalled();
			});
		});
  });
});