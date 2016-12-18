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

		$http({url: url, method: "POST", data: 'username='+username+'&password='+password, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
	    .success(function(data, status, headers,config){
	    	if(data.user) {
	    		var user = data.user[0];
					window.localStorage.setItem('user', JSON.stringify(user));
					deferred.resolve(user);
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