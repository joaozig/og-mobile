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

  describe('#editBet', function() {
  	var playerName, betAmount, expectedBet;

  	beforeEach(function() {
			playerName = 'New Player';
			betAmount = 50;

			service.addBet(playerName, betAmount);

			playerName = 'Edited Player';
			betAmount = 100;

			var params = {
				playerName: playerName,
				betAmount: betAmount
			};

			expectedBet = new Bet(params);
  	});

  	describe('when it successful', function() {
  		it('should return the edited bet object', function() {
				service.editBet(playerName, betAmount).then(
					function(bet) {
						expect(expectedBet.playerName).toEqual(bet.playerName);
						expect(expectedBet.betAmount).toEqual(bet.betAmount);
					},
					function(errorMessage) {
						expect(errorMessage).toEqual(null);
					}
				);
				$rootScope.$apply();
  		});
  	});

  	describe('when it unsuccessful', function() {
  		describe('because the playerName is blank', function() {
	  		it('should not set a new bet object', function() {
					playerName = '';
					service.editBet(playerName, betAmount).then(
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
					service.editBet(playerName, betAmount).then(
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
					service.editBet(playerName, betAmount).then(
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
					service.editBet(playerName, betAmount).then(
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
					service.editBet(playerName, betAmount).then(
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


  describe('#getFinishedBet', function() {
  	describe('when there is a finished bet', function() {
  		it('should return the bet object', function() {
  			betParamsMock.id = 1;
				window.localStorage.setItem('finishedBets', JSON.stringify([betParamsMock]));
				var betReturned = service.getFinishedBet(1);
				expect(betReturned.id).toEqual(betParamsMock.id);
				expect(betReturned.playerName).toEqual(betParamsMock.playerName);
				expect(betReturned.betAmount).toEqual(betParamsMock.betAmount);
				expect(betReturned.tickets).toEqual([]);
				expect(betReturned.jackpot()).toEqual(0);
  		});
  	});
  	describe('when there is no finished bet', function() {
			it('should return null', function() {
				window.localStorage.removeItem('finishedBets');
				expect(service.getFinishedBet(1)).toEqual(null);
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

	describe('#finishBet', function() {
		describe('when it successful', function() {
			beforeEach(function() {
				window.localStorage.removeItem('finishedBets');
				service.addBet(betParamsMock.playerName, betParamsMock.betAmount);
				expectedBet = new Bet(betParamsMock);
				returnedValue = service.finishBet();
			});

			it('should set finishedBets storage', function() {
				expect(window.localStorage.getItem('finishedBets')).not.toEqual(null);
			});

			it('should return the current bet', function() {
				expect(returnedValue.id).not.toEqual(undefined);
				expect(returnedValue.playerName).toEqual(expectedBet.playerName);
				expect(returnedValue.betAmount).toEqual(expectedBet.betAmount);
			});
		});

		describe('when it unsuccessful', function() {
			beforeEach(function() {
				service.removeBet();
				returnedValue = service.finishBet();
			});

			it('should return null', function() {
				expect(returnedValue).toEqual(null);
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

  describe('#removeTicket', function() {
  	describe('when the ticket exists in bet.tickets', function() {
  		it('should remove ticket from bet.tickets list and return true', function() {
				window.localStorage.setItem(BET_CONSTANT, JSON.stringify(betParamsMock));
				var ticket = new Ticket({id: 1, name: '1 gol', tax: 2.5, ticketType: new TicketType()})
				service.addTicket(ticket);
				var bet = service.getBet();

				expect(bet.tickets.length).toEqual(1);
				expect(bet.jackpot()).toEqual(251.25);

				var addReturn = service.removeTicket(ticket.id);
				var betUpdated = service.getBet();

				expect(addReturn).toBeTruthy();
				expect(betUpdated.tickets.length).toEqual(0);
				expect(betUpdated.jackpot()).toEqual(0);
  		});
  	});
  });
});