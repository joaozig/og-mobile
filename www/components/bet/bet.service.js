angular.module('bet')
.constant('BET', 'bet')
.service('BetService', function(BET, $q) {

	var service = this;

	/* Properties */

	/* Public Methods */
	service.addBet = addBet;
	service.getBet = getBet;
	service.removeBet = removeBet;

	/* Initialization */
	init();

	/**** Methods definition ****/
	function init() {

	}

	function addBet(playerName, betAmount) {
		var deferred = $q.defer();

		var validation = validateBet(playerName, betAmount);
		if(validation.valid) {
			var bet = {
				playerName: playerName,
				betAmount: betAmount,
				bets: 0
			};

			window.localStorage.setItem(BET, JSON.stringify(bet));
			deferred.resolve(bet);
		} else {
			deferred.reject(validation.message);
		}

		return deferred.promise;
	}

	function getBet() {
		return JSON.parse(window.localStorage.getItem(BET));
	}

	function removeBet() {
		window.localStorage.removeItem(BET);
		return (service.getBet() == null);
	}

	/* Private Methods */

	function validateBet(playerName, betAmount) {
		betAmount = parseFloat(betAmount);
		var validation = {valid: false, message: 'Falha ao adicionar aposta'};
		if(!playerName) {
			validation.message = 'Preencha o nome do apostador';
		} else if(isNaN(betAmount)) {
			validation.message = 'Preencha o valor a ser apostado';
		} else if(betAmount <= 0) {
			validation.message = 'O valor a ser apostado tem que ser maior que 0';
		} else {
			validation.valid = true;
			validation.message = 'Aposta válida';
		}

		return validation;
	}
});