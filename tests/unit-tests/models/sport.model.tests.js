describe('SportModel', function() {
	var sport;
	var options = {
		id: 1,
		name: 'Futebol'
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				sport = new Sport(options);
			});

			it('id should be the same as passed in options object', function() {
				expect(sport.id).toEqual(options.id);
			});
			it('name should be the same as passed in options object', function() {
				expect(sport.name).toEqual(options.name);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				sport = new Sport();
			});

			it('id should be null', function() {
				expect(sport.id).toEqual(null);
			});
			it('name should be null', function() {
				expect(sport.name).toEqual(null);
			});
		});
	});
});