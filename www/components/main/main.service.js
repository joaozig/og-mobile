angular.module('main')

.service('MainService', function($q, $http) {

	var service = this;

	/* Properties */
	service.sports = [
		new Sport({id: 1, name: 'Futebol Americano'}),
		new Sport({id: 2, name: 'Basquete'}),
		new Sport({id: 3, name: 'Tennis'}),
		new Sport({id: 4, name: 'Volei'}),
		new Sport({id: 50, name: 'Futebol'})
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
		var url = 'http://avantitecnologia.net/jogo/includes/inc.modality.php';

		$http.get(url)
	    .success(function(data, status, headers,config){
	    	console.log(data.modality)
	      deferred.resolve(data.modality);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar os esportes.');
	    })

	  return deferred.promise;
	}
});