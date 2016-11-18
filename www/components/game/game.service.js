angular.module('game')

.service('GameService', function($q) {

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

	/* Methods */
	service.getGame = getGame;
	service.getGames = getGames;

	/**********/

	function getGame(gameId) {
		var deferred = $q.defer();
		var game = {};

		game = service.games.find(function (game) {
		    return game.id === parseInt(gameId);
		});

    if(game) {
    	deferred.resolve(game)
    } else {
      deferred.reject('Jogo não encontrado.')
    }

	  return deferred.promise;
	}

	function getGames(championshipId) {
		var deferred = $q.defer();
		var successfulHttpRequest = true;

    if(successfulHttpRequest) {
    	var games = [];
    	service.games.forEach(function(game) {
    		if(game.championship.id == championshipId) {
    			games.push(game);
    		}
    	});
    	deferred.resolve(games)
    } else {
      deferred.reject('Não foi possível recuperar os jogos.')
    }

	  return deferred.promise;
	}
});