angular.module('financial')
.service('FinancialService', function($q, $http) {

	var service = this;

	/* Public Methods */
	service.getBets = getBets;

	/* Initialization */
	init();

	/**** Methods definition ****/
	function init() {

	}

	function getBets(initialDate, finalDate) {
		var deferred = $q.defer();

		var url = 'http://avantitecnologia.net/jogo/includes/inc.financial.php?dataIni='+initialDate+'&dataFim='+finalDate;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar o financeiro.');
	    })

	  return deferred.promise;
	}
});