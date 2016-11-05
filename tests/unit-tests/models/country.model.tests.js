describe('CountryModel', function() {
	var country;
	var sportOptions = {
		id: 1,
		name: 'Futebol'
	};
	var options = {
		id: 2,
		name: 'Brasil',
		sport: new Sport(sportOptions)
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				country = new Country(options);
			});

			it('id should be the same as passed in options object', function() {
				expect(country.id).toEqual(options.id);
			});
			it('name should be the same as passed in options object', function() {
				expect(country.name).toEqual(options.name);
			});
			it('sport should be the same as passed in options object', function() {
				expect(country.sport.id).toEqual(sportOptions.id);
				expect(country.sport.name).toEqual(sportOptions.name);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				country = new Country();
			});

			it('id should be null', function() {
				expect(country.id).toEqual(null);
			});
			it('name should be null', function() {
				expect(country.name).toEqual(null);
			});
			it('sport should be null', function() {
				expect(country.sport).toEqual(null);
			});
		});
	});
});