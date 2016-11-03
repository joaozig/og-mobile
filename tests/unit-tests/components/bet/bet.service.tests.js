describe('BetService', function() {

	var service;
	var BET_CONSTANT = 'bet';
	var $rootScope;
	var betMock = {
		playerName: 'Player Name',
		betAmount: 100.50,
		bets: 2
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
			expectedBet = {
				playerName: playerName,
				betAmount: betAmount,
				bets: 0
			};
  	});

  	describe('when it successful', function() {
  		it('should return the new bet object', function() {
				service.addBet(playerName, betAmount).then(
					function(bet) {
						expect(expectedBet).toEqual(bet);
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

  describe('#getBet', function() {
  	describe('when there is an active bet', function() {
  		it('should return the bet object', function() {
				window.localStorage.setItem(BET_CONSTANT, JSON.stringify(betMock));
				var betReturned = service.getBet();
				expect(betReturned).toEqual(betMock);
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
			window.localStorage.setItem(BET_CONSTANT, JSON.stringify(betMock));
			service.removeBet();
			expect(window.localStorage.getItem(BET_CONSTANT)).toEqual(null);
		});
  });
});