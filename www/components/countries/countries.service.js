angular.module('countries')

.service('CountriesService', function($q) {

	var service = this;

	/* Properties */
	service.countries = [
		{id: 1, name: 'Argentina'},
		{id: 2, name: 'Brasil'},
		{id: 3, name: 'Estados Unidos'},
		{id: 4, name: 'França'},
		{id: 5, name: 'Portugal'}
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
		var successfulHttpRequest = true;

    if(successfulHttpRequest) {
    	deferred.resolve(service.countries)
    } else {
      deferred.reject('Não foi possível recuperar os países.')
    }

	  return deferred.promise;
	}
});