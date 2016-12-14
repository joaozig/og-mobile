angular.module('login')

.service('LoginService', function($q) {

	var service = this;
	service.validUsers = [
		{username: 'admin', password: 'admin', name: 'Marcos Amaral'},
		{username: 'marcos_ourica', password: 'marcos_ourica'},
		{username: 'joao', password: 'joao'}
	];

	service.login = function(username, password) {
		var deferred = $q.defer();
		var user = service.validUsers.find(function(user) {
			return (user.username == username && user.password == password);
		});

    if(user) {
			window.localStorage.setItem('user', JSON.stringify(user));
    	deferred.resolve(user)
    } else {
      deferred.reject('Usuário e/ou Senha incorreto(s)')
    }

	  return deferred.promise;
	}

	service.getUser = function() {
		var user = window.localStorage.getItem('user');
		user = JSON.parse(user);
		return user;
	}
});