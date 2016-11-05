angular.module('main')

.service('MainService', function($q) {

	var service = this;

	/* Properties */
	service.sports = [
		new Sport({id: 1, name: 'Futebol Americano'}),
		new Sport({id: 2, name: 'Basquete'}),
		new Sport({id: 3, name: 'Futebol'}),
		new Sport({id: 4, name: 'Volei'})
	];

	/* Methods */
	service.getSport = getSport;
	service.getSports = getSports;

	/**********/

	function getSport(sportId) {
		var deferred = $q.defer();
		var sport = {};

		sport = service.sports.find(function (sport) {
		    return sport.id === parseInt(sportId);
		});

    if(sport) {
    	deferred.resolve(sport)
    } else {
      deferred.reject('Esporte não encontrado.')
    }

	  return deferred.promise;
	}

	function getSports() {
		var deferred = $q.defer();
		var successfulHttpRequest = true;

    if(successfulHttpRequest) {
    	deferred.resolve(service.sports)
    } else {
      deferred.reject('Não foi possível recuperar os esportes.')
    }

	  return deferred.promise;
	}
});