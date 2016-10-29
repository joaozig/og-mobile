angular.module('login')

.controller('LoginController', function($scope, LoginService) {
	var vm = this

	/* Properties */
	vm.user = {}

	/* Methods */
	vm.login = login;

	/**********/

	function login(user) {
		LoginService.login(user)
			.then(
				function(user) {
					alert('Login com sucesso!!!')
				},
				function(errorMessage) {
					alert(errorMessage)
				}
			);
	}
});