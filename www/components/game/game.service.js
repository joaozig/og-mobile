angular.module('game')

.service('GameService', function($q) {

	var service = this;

	/* Properties */
	service.games = [
		{id: 1, name: 'São Paulo x Palmeiras'},
		{id: 2, name: 'Grêmio x Sport'},
		{id: 3, name: 'Santos x Santa Cruz'}
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
    	deferred.resolve(service.games)
    } else {
      deferred.reject('Não foi possível recuperar os jogos.')
    }

	  return deferred.promise;
	}
});