angular.module('main')

.service('MainService', function($q) {

	this.getSports = function() {
		var deferred = $q.defer();
		var successfulHttpRequest = true;

    if(successfulHttpRequest) {
			var sports = [
				{id: 1, name: 'Futebol Americano'},
				{id: 2, name: 'Basquete'},
				{id: 3, name: 'Futebol'},
				{id: 4, name: 'Volei'}
			];
    	deferred.resolve(sports)
    } else {
      deferred.reject('Não foi possível recuperar os esportes.')
    }

	  return deferred.promise;
	}
});