angular.module('login')

.controller('LoginController', function(LoginService) {
	var vm = this

	/* Properties */
	vm.user = {username: '', password: ''}

	/* Methods */
	vm.doLogin = doLogin;

	/**********/

	function doLogin() {
		LoginService.login(vm.user.username, vm.user.password)
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