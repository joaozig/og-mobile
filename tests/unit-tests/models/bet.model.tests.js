describe('BetModel', function() {
	var bet;
	var options = {
		playerName: 'Player',
		betAmount: 100
	};

	describe('Initialization', function() {
		describe('with valid parameters', function() {
			beforeEach(function() {
				bet = new Bet(options);
			});

			it('playerName should be the same as passed in options object', function() {
				expect(bet.playerName).toEqual(options.playerName);
			});
			it('betAmount should be the same as passed in options object', function() {
				expect(bet.betAmount).toEqual(options.betAmount);
			});
			it('tickets should be an empty array', function() {
				expect(bet.tickets).toEqual([]);
			});
		});

		describe('with no parameters', function() {
			beforeEach(function() {
				bet = new Bet();
			});

			it('playerName should be empty', function() {
				expect(bet.playerName).toEqual('');
			});
			it('betAmount should be 0', function() {
				expect(bet.betAmount).toEqual(0);
			});
			it('tickets should be an empty array', function() {
				expect(bet.tickets).toEqual([]);
			});
		});
	});

	describe('#jackpot', function() {
		beforeEach(function() {
			bet = new Bet(options);
		});

		describe('when has tickets', function() {
			it('should return the amount of betAmount and taxes of tickets', function() {
				bet.tickets.push(new Ticket({id: 1, tax: 2}));
				bet.tickets.push(new Ticket({id: 2, tax: 3.5}));
				bet.tickets.push(new Ticket({id: 2, tax: 0.75}));
				expect(bet.jackpot()).toEqual(625);
			});
		});

		describe('when tickets is empty', function() {
			it('should return 0', function() {
				expect(bet.jackpot()).toEqual(0);
			});
		});
	});
});