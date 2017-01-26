angular.module('financial')
.service('FinancialService', function($q, $http, LoginService, MainService) {

	var service = this;

	/* Public Methods */
	service.getBets = getBets;
	service.getResume = getResume;

	/* Initialization */
	init();

	/**** Methods definition ****/
	function init() {

	}

	function getBets(initialDate, finalDate, sellerId) {
		var deferred = $q.defer();

		var url = MainService.apiUrl + '/includes/inc.financial.php?dataIni='+initialDate+'&dataFim='+finalDate+'&seller='+sellerId;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar o financeiro.');
	    })

	  return deferred.promise;
	}

	function getResume(initialDate, finalDate) {
		var deferred = $q.defer();
		var user = LoginService.getUser();

		var url = MainService.apiUrl + '/includes/inc.financial.manager.php?dataIni='+initialDate+'&dataFim='+finalDate+'&seller='+user.id;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar o resumo financeiro.');
	    })

	  return deferred.promise;
	}
});