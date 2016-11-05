describe('TicketModel', function() {
	var ticket;
	var sportOptions = {
		id: 1,
		name: 'Futebol'
	};
	var countryOptions = {
		id: 2,
		name: 'Brasil',
		sport: new Sport(sportOptions)
	};
	var championshipOptions = {
		id: 3,
		name: 'Série A',
		country: new Country(countryOptions)
	};
	var gameOptions = {
		id: 4,
		teamA: 'Nautico',
		teamB: 'Sport',
		date: '23/10/2016',
		time: '21:00',
		championship: new Championship(championshipOptions)
	};
	var ticketTypeOptions = {
		id: 5,
		name: 'Total de Gols',
		game: new Game(gameOptions),
		tickets: []
	};
	var options = {
		id: 1,
		name: '1 gol',
		tax: 2.5,
		ticketType: new TicketType(ticketTypeOptions)
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				ticket = new Ticket(options);
				ticketMock = new Ticket(options);
				ticket.ticketType.tickets[0] = ticketMock;
			});

			it('id should be the same as passed in options object', function() {
				expect(ticket.id).toEqual(options.id);
			});
			it('name should be the same as passed in options object', function() {
				expect(ticket.name).toEqual(options.name);
			});
			it('tax should be the same as passed in options object', function() {
				expect(ticket.tax).toEqual(options.tax);
			});
			it('ticketType should be the same as passed in options object', function() {
				expect(ticket.ticketType.id).toEqual(ticketTypeOptions.id);
				expect(ticket.ticketType.name).toEqual(ticketTypeOptions.name);
				expect(ticket.ticketType.tickets).toEqual([ticketMock]);
				expect(ticket.ticketType.game.id).toEqual(gameOptions.id);
				expect(ticket.ticketType.game.teamA).toEqual(gameOptions.teamA);
				expect(ticket.ticketType.game.teamB).toEqual(gameOptions.teamB);
				expect(ticket.ticketType.game.date).toEqual(gameOptions.date);
				expect(ticket.ticketType.game.championship.name).toEqual(championshipOptions.name);
				expect(ticket.ticketType.game.championship.id).toEqual(championshipOptions.id);
				expect(ticket.ticketType.game.championship.name).toEqual(championshipOptions.name);
				expect(ticket.ticketType.game.championship.country.id).toEqual(countryOptions.id);
				expect(ticket.ticketType.game.championship.country.name).toEqual(countryOptions.name);
				expect(ticket.ticketType.game.championship.country.sport.id).toEqual(sportOptions.id);
				expect(ticket.ticketType.game.championship.country.sport.name).toEqual(sportOptions.name);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				ticket = new Ticket();
			});

			it('id should be null', function() {
				expect(ticket.id).toEqual(null);
			});
			it('name should be null', function() {
				expect(ticket.name).toEqual(null);
			});
			it('tax should be 0', function() {
				expect(ticket.tax).toEqual(0);
			});
			it('ticketType should be null', function() {
				expect(ticket.ticketType).toEqual(null);
			});
		});
	});
});