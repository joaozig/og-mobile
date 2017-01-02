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

	function getBets() {
		var deferred = $q.defer();

		var url = 'http://avantitecnologia.net/jogo/includes/inc.financial.php?dataIni=2016-08-01&dataFim=2016-12-12';

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