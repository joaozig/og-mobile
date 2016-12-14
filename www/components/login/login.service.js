angular.module('login')

.service('LoginService', function($q, $http) {

	var service = this;
	service.validUsers = [
		{username: 'admin', password: 'admin'},
		{username: 'marcos_ourica', password: 'marcos_ourica'},
		{username: 'joao', password: 'joao'}
	];

	service.login = function(username, password) {
		var deferred = $q.defer();
		var url = 'http://avantitecnologia.net/jogo/includes/inc.login.php';

		$http.post(url, {username: username, password: password})
	    .success(function(data, status, headers,config){
	    	console.log(data.user);
	    	if(data.user) {
					deferred.resolve(data.user);
	    	} else {
					deferred.reject('Usuário e/ou Senha incorreto(s)');
	    	}
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Falha ao fazer login');
	    })

	  return deferred.promise;
	}
});