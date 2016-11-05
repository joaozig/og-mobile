describe('ChampionshipModel', function() {
	var championship;
	var sportOptions = {
		id: 1,
		name: 'Futebol'
	};
	var countryOptions = {
		id: 2,
		name: 'Brasil',
		sport: new Sport(sportOptions)
	};
	var options = {
		id: 3,
		name: 'Série A',
		country: new Country(countryOptions)
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				championship = new Championship(options);
			});

			it('id should be the same as passed in options object', function() {
				expect(championship.id).toEqual(options.id);
			});
			it('name should be the same as passed in options object', function() {
				expect(championship.name).toEqual(options.name);
			});
			it('country should be the same as passed in options object', function() {
				expect(championship.country.id).toEqual(countryOptions.id);
				expect(championship.country.name).toEqual(countryOptions.name);
				expect(championship.country.sport.id).toEqual(sportOptions.id);
				expect(championship.country.sport.name).toEqual(sportOptions.name);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				championship = new Championship();
			});

			it('id should be null', function() {
				expect(championship.id).toEqual(null);
			});
			it('name should be null', function() {
				expect(championship.name).toEqual(null);
			});
			it('country should be null', function() {
				expect(championship.country).toEqual(null);
			});
		});
	});
});