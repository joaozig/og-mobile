angular.module('results')
.service('ResultsService', function($q, $http) {

	var service = this;

	/* Public Methods */
	service.getResults = getResults;

	/* Initialization */
	init();

	/**** Methods definition ****/
	function init() {

	}

	function getResults(initialDate, finalDate) {
		var deferred = $q.defer();

		var url = 'http://avantitecnologia.net/jogo/includes/inc.result.php?dataIni='+initialDate+'&dataFim='+finalDate;
		var url = 'http://avantitecnologia.net/jogo/includes/inc.result.php?dataIni=2017-01-01&dataFim=2017-12-30';

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar os resultados.');
	    })

	  return deferred.promise;
	}
});