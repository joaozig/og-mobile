angular.module('login')

.service('LoginService', function($q) {

	this.login = function(username, password) {
		var deferred = $q.defer();

    if(username == 'joao@joao.com' && password == '123') {
			window.localStorage.setItem('user', 'joao');
    	deferred.resolve(username)
    } else {
      deferred.reject('Usuário e/ou Senha incorreto(s)')
    }

	  return deferred.promise;
	}
});