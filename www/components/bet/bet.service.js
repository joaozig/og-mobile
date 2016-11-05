angular.module('bet')
.constant('BET', 'bet')
.service('BetService', function(BET, $q) {

	var service = this;

	/* Properties */

	/* Public Methods */
	service.addBet = addBet;
	service.addTicket = addTicket;
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
			var params = {
				playerName: playerName,
				betAmount: betAmount
			};

			var bet = new Bet(params)
			saveBet(bet);
			deferred.resolve(bet);
		} else {
			deferred.reject(validation.message);
		}

		return deferred.promise;
	}

	function addTicket(ticket) {
		var bet = service.getBet();

		if(!bet) {
			return false;
		}

		bet.tickets.push(ticket);
		saveBet(bet);
		return true;
	}

	function getBet() {
		var params = JSON.parse(window.localStorage.getItem(BET));
		if(params != null) {
			return new Bet(params);
		} else {
			return null;
		}
	}

	function removeBet() {
		window.localStorage.removeItem(BET);
		return (service.getBet() == null);
	}

	/* Private Methods */

	function saveBet(bet) {
		var params = {
			playerName: bet.playerName,
			betAmount: bet.betAmount,
			tickets: bet.tickets
		}
		window.localStorage.setItem(BET, JSON.stringify(params));
	}

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