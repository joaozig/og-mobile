angular.module('login')

.service('LoginService', function($q) {

	this.login = function(user) {
		console.log(user)
		var deferred = $q.defer();

    if(user.username == 'joao@joao.com' && user.password == '123') {
			window.localStorage.setItem('user', 'joao');
    	deferred.resolve(user)
    } else {
      deferred.reject('Usuário e/ou Senha incorreto(s)')
    }

	  return deferred.promise;
	}
});