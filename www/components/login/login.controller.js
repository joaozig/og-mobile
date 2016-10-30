angular.module('login')

.controller('LoginController', function($state, $ionicHistory, LoginService) {
	var vm = this;

  $ionicHistory.nextViewOptions({
     disableBack: true
  });

	/* Properties */
	vm.user = {username: '', password: ''}

	/* Methods */
	vm.doLogin = doLogin;

	/**********/

	function doLogin() {
		LoginService.login(vm.user.username, vm.user.password)
			.then(
				function(user) {
					$state.go('app.main');
				},
				function(errorMessage) {
					alert(errorMessage)
				}
			);
	}
});