angular.module('login')

.controller('LoginController', function($state, $ionicHistory, $ionicPopup, $ionicLoading, LoginService) {
	var vm = this;

  $ionicHistory.nextViewOptions({
     disableBack: true
  });

	/* Properties */
	vm.user = {username: '', password: ''}

	/* Methods */
	vm.doLogin = doLogin;
	vm.showLoading = showLoading;
	vm.hideLoading = hideLoading;

	/**********/

	function doLogin() {
		vm.showLoading();
		LoginService.login(vm.user.username, vm.user.password)
			.then(
				function(user) {
					vm.hideLoading();
					$state.go('app.main');
				},
				function(errorMessage) {
					vm.hideLoading();
					$ionicPopup.alert({
						title: 'Login falhou :(',
						template: errorMessage
					});
				}
			);
	}

  function showLoading() {
    $ionicLoading.show({
      template: 'Entrando...'
    });
  };

  function hideLoading(){
    $ionicLoading.hide();
  };
});