describe('TicketTypeModel', function() {
	var type;
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
	var ticketsMock = [
		new Ticket({id: 1, name: '1 gol', tax: 2.5, type: self}),
		new Ticket({id: 2, name: '2 gols', tax: 4, type: self})
	];
	var options = {
		id: 5,
		name: 'Total de Gols',
		game: new Game(gameOptions),
		tickets: ticketsMock
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				type = new TicketType(options);
			});

			it('id should be the same as passed in options object', function() {
				expect(type.id).toEqual(options.id);
			});
			it('name should be the same as passed in options object', function() {
				expect(type.name).toEqual(options.name);
			});
			it('tickets should be the same as passed in options object', function() {
				expect(type.tickets).toEqual(options.tickets);
			});
			it('game should be the same as passed in options object', function() {
				expect(type.game.id).toEqual(gameOptions.id);
				expect(type.game.teamA).toEqual(gameOptions.teamA);
				expect(type.game.teamB).toEqual(gameOptions.teamB);
				expect(type.game.date).toEqual(gameOptions.date);
				expect(type.game.championship.name).toEqual(championshipOptions.name);
				expect(type.game.championship.id).toEqual(championshipOptions.id);
				expect(type.game.championship.name).toEqual(championshipOptions.name);
				expect(type.game.championship.country.id).toEqual(countryOptions.id);
				expect(type.game.championship.country.name).toEqual(countryOptions.name);
				expect(type.game.championship.country.sport.id).toEqual(sportOptions.id);
				expect(type.game.championship.country.sport.name).toEqual(sportOptions.name);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				type = new TicketType();
			});

			it('id should be null', function() {
				expect(type.id).toEqual(null);
			});
			it('name should be null', function() {
				expect(type.name).toEqual(null);
			});
			it('game should be null', function() {
				expect(type.game).toEqual(null);
			});
			it('tickets should be an empty array', function() {
				expect(type.tickets).toEqual([]);
			});
		});
	});
});