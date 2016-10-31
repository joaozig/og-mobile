describe('LoginController', function() {

	var controller;
	var stateMock;

	beforeEach(module('ourigol'));

	beforeEach(inject(function($controller, $q) {

    // mock $state
    stateMock = jasmine.createSpyObj('$state spy', ['go']);

		controller = $controller('AppController', {$state: stateMock});
	}));

  describe('#doLogout', function() {

		beforeEach(inject(function() {
			controller.doLogout();
		}));

	  it('should redirect to login page', function() {
	      expect(stateMock.go).toHaveBeenCalledWith('app.login');
	  });
  });
});