describe('BetService', function() {

	var service;
	var BET_CONSTANT = 'bet';
	var $rootScope;
	var betParamsMock = {
		playerName: 'Player Name',
		betAmount: 100.50,
		tickets: []
	};

	beforeEach(module('bet'));

	beforeEach(inject(function($injector, _$rootScope_) {
		$rootScope = _$rootScope_;
		service = $injector.get('BetService');
	}));

  describe('#addBet', function() {
  	var playerName, betAmount, expectedBet;

  	beforeEach(function() {
			playerName = 'New Player';
			betAmount = 50;
			var params = {
				playerName: playerName,
				betAmount: betAmount
			};
			expectedBet = new Bet(params);
  	});

  	describe('when it successful', function() {
  		it('should return the new bet object', function() {
				service.addBet(playerName, betAmount).then(
					function(bet) {
						expect(expectedBet.playerName).toEqual(bet.playerName);
					},
					function(errorMessage) {
						expect(errorMessage).toEqual(null);
					}
				);
				$rootScope.$apply();
  		});
  	});

  	describe('when it unsuccessful', function() {
  		beforeEach(function() {
				window.localStorage.removeItem(BET_CONSTANT);
  		});

  		describe('because the playerName is blank', function() {
	  		it('should not set a new bet object', function() {
					playerName = '';
					service.addBet(playerName, betAmount).then(
						function(bet) {
							expect(bet).toEqual(null);
						},
						function(errorMessage) {
							expect(errorMessage).toEqual('Preencha o nome do apostador');
						}
					);
					$rootScope.$apply();
	  		});
  		});
  		describe('because the betAmount is blank', function() {
	  		it('should not set a new bet object', function() {
					betAmount = '';
					service.addBet(playerName, betAmount).then(
						function(bet) {
							expect(bet).toEqual(null);
						},
						function(errorMessage) {
							expect(errorMessage).toEqual('Preencha o valor a ser apostado');
						}
					);
					$rootScope.$apply();
	  		});
  		});
  		describe('because the betAmount is not a valid float', function() {
	  		it('should not set a new bet object', function() {
					betAmount = 'string';
					service.addBet(playerName, betAmount).then(
						function(bet) {
							expect(bet).toEqual(null);
						},
						function(errorMessage) {
							expect(errorMessage).toEqual('Preencha o valor a ser apostado');
						}
					);
					$rootScope.$apply();
	  		});
  		});
  		describe('because the betAmount is negative', function() {
	  		it('should not set a new bet object', function() {
					betAmount = '-2';
					service.addBet(playerName, betAmount).then(
						function(bet) {
							expect(bet).toEqual(null);
						},
						function(errorMessage) {
							expect(errorMessage).toEqual('O valor a ser apostado tem que ser maior que 0');
						}
					);
					$rootScope.$apply();
	  		});
  		});
  		describe('because the betAmount is zero', function() {
	  		it('should not set a new bet object', function() {
					betAmount = '0';
					service.addBet(playerName, betAmount).then(
						function(bet) {
							expect(bet).toEqual(null);
						},
						function(errorMessage) {
							expect(errorMessage).toEqual('O valor a ser apostado tem que ser maior que 0');
						}
					);
					$rootScope.$apply();
	  		});
  		});
  	});
  });

  describe('#addTicket', function() {
  	describe('when there is an active bet', function() {
  		it('should save ticket to bet and return true', function() {
				window.localStorage.setItem(BET_CONSTANT, JSON.stringify(betParamsMock));
				var betReturned = service.getBet();
				var ticket = new Ticket({id: 1, name: '1 gol', tax: 2.5, ticketType: new TicketType()})
				var addReturn = service.addTicket(ticket);
				var betUpdated = service.getBet();

				expect(addReturn).toBeTruthy();
				expect(betUpdated.tickets.length).toEqual(1);
				expect(betUpdated.jackpot()).toEqual(251.25)
  		});
  	});
  	describe('when there is no bet', function() {
			it('should return null', function() {
				window.localStorage.removeItem(BET_CONSTANT);
				expect(service.getBet()).toEqual(null);
			});
  	});
  });

  describe('#getBet', function() {
  	describe('when there is an active bet', function() {
  		it('should return the bet object', function() {
				window.localStorage.setItem(BET_CONSTANT, JSON.stringify(betParamsMock));
				var betReturned = service.getBet();
				expect(betReturned.playerName).toEqual(betParamsMock.playerName);
				expect(betReturned.betAmount).toEqual(betParamsMock.betAmount);
				expect(betReturned.tickets).toEqual([]);
				expect(betReturned.jackpot()).toEqual(0);
  		});
  	});
  	describe('when there is no bet', function() {
			it('should return null', function() {
				window.localStorage.removeItem(BET_CONSTANT);
				expect(service.getBet()).toEqual(null);
			});
  	});
  });

  describe('#removeBet', function() {
		it('should remove the bet', function() {
			window.localStorage.setItem(BET_CONSTANT, JSON.stringify(betParamsMock));
			service.removeBet();
			expect(window.localStorage.getItem(BET_CONSTANT)).toEqual(null);
		});
  });
});