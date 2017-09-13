angular.module('countries')

.service('CountriesService', function($q, $http, MainService) {

	var service = this;

	/* Properties */
	service.countries = [
		new Country({id: 1, name: 'Argentina', sport: new Sport({id: 1, name: 'Futebol'})}),
		new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})}),
		new Country({id: 3, name: 'Estados Unidos', sport: new Sport({id: 1, name: 'Futebol'})}),
		new Country({id: 4, name: 'França', sport: new Sport({id: 1, name: 'Futebol'})}),
		new Country({id: 5, name: 'Portugal', sport: new Sport({id: 1, name: 'Futebol'})})
	];

	/* Methods */
	service.getCountry = getCountry;
	service.getCountries = getCountries;

	/**********/

	function getCountry(countryId) {
		var deferred = $q.defer();
		var country = {};

		country = service.countries.find(function (country) {
		    return country.id === parseInt(countryId);
		});

    if(country) {
    	deferred.resolve(country)
    } else {
      deferred.reject('País não encontrado.')
    }

	  return deferred.promise;
	}

	function getCountries(sportId) {
		var deferred = $q.defer();
		sportId = 50;
		var url = MainService.apiUrl + '/includes/inc.country.php?sportId=' + sportId;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data.country);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar os países.');
	    })

	  return deferred.promise;
	}
});