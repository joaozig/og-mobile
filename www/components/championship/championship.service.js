angular.module('championship')

.service('ChampionshipService', function($q) {

	var service = this;

	/* Properties */
	service.championships = [
		{id: 1, name: 'Série A'},
		{id: 2, name: 'Série B'},
		{id: 3, name: 'Copa do Brasil'}
	];

	/* Methods */
	service.getChampionship = getChampionship;
	service.getChampionships = getChampionships;

	/**********/

	function getChampionship(championshipId) {
		var deferred = $q.defer();
		var championship = {};

		championship = service.championships.find(function (championship) {
		    return championship.id === parseInt(championshipId);
		});

    if(championship) {
    	deferred.resolve(championship)
    } else {
      deferred.reject('Campeonato não encontrado.')
    }

	  return deferred.promise;
	}

	function getChampionships(countryId) {
		var deferred = $q.defer();
		var successfulHttpRequest = true;

    if(successfulHttpRequest) {
    	deferred.resolve(service.championships)
    } else {
      deferred.reject('Não foi possível recuperar os campeonatos.')
    }

	  return deferred.promise;
	}
});