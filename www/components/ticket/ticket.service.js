angular.module('ticket')

.service('TicketService', function($q, $http) {

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
		})
	];

	service.ticketTypes = [
		new TicketType({
			id: 1,
			name: 'Total de Gols no jogo',
			game: service.games[0],
			tickets: [
				new Ticket({id: 1, name: '1 gol', tax: 1.34, ticketType: new TicketType({id: 1, name: 'Total de Gols no jogo', game: service.games[0]})}),
				new Ticket({id: 2, name: '2 gols', tax: 3.5, ticketType: new TicketType({id: 1, name: 'Total de Gols no jogo', game: service.games[0]})}),
				new Ticket({id: 3, name: '3 gols', tax: 4, ticketType: new TicketType({id: 1, name: 'Total de Gols no jogo', game: service.games[0]})})
			]
		}),
		new TicketType({
			id: 2,
			name: 'Resultado no intervalo',
			game: service.games[0],
			tickets: [
				new Ticket({id: 4, name: '0x0', tax: 1.34, ticketType: new TicketType({id: 1, name: 'Resultado no intervalo', game: service.games[0]})}),
				new Ticket({id: 5, name: '1x1', tax: 2.13, ticketType: new TicketType({id: 1, name: 'Resultado no intervalo', game: service.games[0]})}),
				new Ticket({id: 6, name: '2x2', tax: 3.56, ticketType: new TicketType({id: 1, name: 'Resultado no intervalo', game: service.games[0]})}),
				new Ticket({id: 7, name: '3x3', tax: 7.56, ticketType: new TicketType({id: 1, name: 'Resultado no intervalo', game: service.games[0]})})
			]
		})
	];

	/* Methods */
	service.getTicketTypes = getTicketTypes;

	/**********/

	function getTicketTypes(gameId) {
		var deferred = $q.defer();

		var url = 'http://avantitecnologia.net/jogo/includes/inc.games.php?gameId=' + gameId;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data.game);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar os palpites.');
	    })

	  return deferred.promise;
	}
});