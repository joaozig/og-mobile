describe('GameModel', function() {
	var game;
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
	var options = {
		id: 4,
		teamA: 'Nautico',
		teamB: 'Sport',
		date: '23/10/2016',
		time: '21:00',
		championship: new Championship(championshipOptions)
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				game = new Game(options);
			});

			it('id should be the same as passed in options object', function() {
				expect(game.id).toEqual(options.id);
			});
			it('teamA should be the same as passed in options object', function() {
				expect(game.teamA).toEqual(options.teamA);
			});
			it('teamB should be the same as passed in options object', function() {
				expect(game.teamB).toEqual(options.teamB);
			});
			it('date should be the same as passed in options object', function() {
				expect(game.date).toEqual(options.date);
			});
			it('time should be the same as passed in options object', function() {
				expect(game.time).toEqual(options.time);
			});
			it('championship should be the same as passed in options object', function() {
				expect(game.championship.id).toEqual(championshipOptions.id);
				expect(game.championship.name).toEqual(championshipOptions.name);
				expect(game.championship.country.id).toEqual(countryOptions.id);
				expect(game.championship.country.name).toEqual(countryOptions.name);
				expect(game.championship.country.sport.id).toEqual(sportOptions.id);
				expect(game.championship.country.sport.name).toEqual(sportOptions.name);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				game = new Game();
			});

			it('id should be null', function() {
				expect(game.id).toEqual(null);
			});
			it('teamA should be null', function() {
				expect(game.teamA).toEqual(null);
			});
			it('teamB should be null', function() {
				expect(game.teamA).toEqual(null);
			});
			it('date should be null', function() {
				expect(game.date).toEqual(null);
			});
			it('time should be null', function() {
				expect(game.time).toEqual(null);
			});
			it('championship should be null', function() {
				expect(game.championship).toEqual(null);
			});
		});
	});
});