angular.module('championship')

.service('ChampionshipService', function($q, $http, MainService) {

	var service = this;

	/* Properties */
	service.games = [
		new Game({
			id: 1,
			teamA: {name: 'São Paulo', img: 'img/teams_logo/logo_sao_paulo.png'},
			teamB: {name: 'Corinthians', img: 'img/teams_logo/logo_corinthians.png'},
			date: '06/11/2016',
			time: '16:00',
			championship: new Championship({id: 1, name: 'Série A', country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})})})
		}),
		new Game({
			id: 2,
			teamA: {name: 'Grêmio', img: 'img/teams_logo/logo_gremio.png'},
			teamB: {name: 'Sport', img: 'img/teams_logo/logo_sport.png'},
			date: '06/11/2016',
			time: '16:00',
			championship: new Championship({id: 1, name: 'Série A', country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})})})
		}),
		new Game({
			id: 3,
			teamA: {name: 'Náutico', img: 'img/teams_logo/logo_nautico.png'},
			teamB: {name: 'Bahia', img: 'img/teams_logo/logo_bahia.png'},
			date: '05/11/2016',
			time: '16:30',
			championship: new Championship({id: 2, name: 'Série B', country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})})})
		}),
		new Game({
			id: 4,
			teamA: {name: 'Avaí', img: 'img/teams_logo/logo_avai.png'},
			teamB: {name: 'São Paulo', img: 'img/teams_logo/logo_sao_paulo.png'},
			date: '12/11/2016',
			time: '19:30',
			championship: new Championship({id: 3, name: 'Copa do Brasil', country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})})})
		})
	];

	service.championships = [
		{
			id: 1, name: 'Série A',
			country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})}),
			games: [service.games[0], service.games[1]]
		},
		{
			id: 2, name: 'Série B',
			country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})}),
			games: [service.games[2]]
		},
		{
			id: 3, name: 'Copa do Brasil',
			country: new Country({id: 2, name: 'Brasil', sport: new Sport({id: 1, name: 'Futebol'})}),
			games: [service.games[3]]
		}
	];

	/* Methods */
	service.getChampionship = getChampionship;
	service.getChampionships = getChampionships;
	service.getChampionshipsMock = getChampionshipsMock;

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

	function getChampionshipsMock(countryId) {
		var deferred = $q.defer();
		var successfulHttpRequest = true;

    if(successfulHttpRequest) {
    	deferred.resolve(service.championships)
    } else {
      deferred.reject('Não foi possível recuperar os campeonatos.')
    }

	  return deferred.promise;
	}

	function getChampionships(sportId) {
		var deferred = $q.defer();
		var url = MainService.apiUrl + '/includes/inc.championship.php?sportId=' + sportId;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data.championship);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar os campeonatos.');
	    })

	  return deferred.promise;
	}
});