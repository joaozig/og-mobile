describe('TicketModel', function() {
	var ticket;
	var options = {
		id: 1,
		tax: 2.5
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				ticket = new Ticket(options);
			});

			it('id should be the same as passed in options object', function() {
				expect(ticket.id).toEqual(options.id);
			});
			it('tax should be the same as passed in options object', function() {
				expect(ticket.tax).toEqual(options.tax);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				ticket = new Ticket();
			});

			it('id should be the same as passed in options object', function() {
				expect(ticket.id).toEqual(null);
			});
			it('playerName should be the same as passed in options object', function() {
				expect(ticket.tax).toEqual(0);
			});
		});
	});
});