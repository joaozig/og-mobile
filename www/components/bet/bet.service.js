angular.module('bet')
.constant('BET', 'bet')
.service('BetService', function(BET, $q, $http, LoginService) {

	var service = this;

	/* Properties */
	service.minBetAmount = 2;
	service.maxBetAmount = 150;

	/* Public Methods */
	service.addBet = addBet;
	service.editBet = editBet;
	service.getBet = getBet;
	service.getFinishedBet = getFinishedBet;
	service.removeBet = removeBet;
	service.finishBet = finishBet;
	service.addTicket = addTicket;
	service.removeTicket = removeTicket;

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

	function editBet(playerName, betAmount) {
		var deferred = $q.defer();

		var validation = validateBet(playerName, betAmount);
		if(validation.valid) {
			var bet = service.getBet()
			bet.playerName = playerName;
			bet.betAmount = betAmount;
			saveBet(bet);
			deferred.resolve(bet);
		} else {
			deferred.reject(validation.message);
		}

		return deferred.promise;
	}

	function getBet() {
		var params = JSON.parse(window.localStorage.getItem(BET));
		if(params != null) {
			return new Bet(params);
		} else {
			return null;
		}
	}

	function getFinishedBet(betId) {
		var finishedBets = getFinishedBets();
		var finishedBet = null;
		finishedBets.forEach(function(bet) {
			if(bet.id == betId) {
				finishedBet = new Bet(bet);
			}
		});

		return finishedBet;
	}

	function removeBet() {
		window.localStorage.removeItem(BET);
		return (service.getBet() == null);
	}

	function finishBet() {
		var bet = service.getBet();

		if(bet) {
			if(service.removeBet()) {
				var finishedBets = getFinishedBets();
				bet.id = finishedBets.length + 1;
				bet.seller = LoginService.getUser();
				bet.date = new Date().toLocaleString('pt');
				var params = {
					id: bet.id,
					playerName: bet.playerName,
					seller: bet.seller,
					betAmount: bet.betAmount,
					tickets: bet.tickets,
					date: bet.date
				}
				finishedBets.push(params);
				window.localStorage.setItem('finishedBets', JSON.stringify(finishedBets));
				return bet;
			}
		}

		return null;
	}

	function addTicket(ticket) {
		var bet = service.getBet();

		if(!bet) {
			return false;
		}

		if(validateTicket(ticket)){
			bet.tickets.push(ticket);
			saveBet(bet);
			return true;
		} else {
			return false;
		}
	}

	function removeTicket(ticketId) {
		var bet = service.getBet();
		var index = null;
  	bet.tickets.forEach(function(ticket, i) {
  		if(ticket.id == ticketId) {
  			index = i;
  		}
  	});

  	if(index !== null) {
  		bet.tickets.splice(index, 1);
  		saveBet(bet);
  		return true;
  	} else {
  		return false;
  	}
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
		} else if(betAmount < service.minBetAmount || betAmount > service.maxBetAmount) {
			validation.message = 'O valor a ser apostado tem que ser no mínimo ' + service.minBetAmount + ' e no máximo ' + service.maxBetAmount + ' reais';
		} else {
			validation.valid = true;
			validation.message = 'Aposta válida';
		}

		return validation;
	}

	function validateTicket(ticket) {
		var game = ticket.ticketType.game;
		var now = new Date();
		var d = game.date.split("/");
		var date = d[2]+'-'+d[1]+'-'+d[0];
		var finalDate = new Date(date + " " + game.time);
		var diffMs = (finalDate - now); // milliseconds between now & Christmas
		var diffDays = Math.round(diffMs / 86400000); // days
		var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

		// can't add new ticket when left 5 minutes to the start of the game
		if(diffDays == 0 && diffHrs == 0 && diffMins <= 5) {
			return false;
		} else {
			return true;
		}
	}

	function getFinishedBets() {
		var finishedBets = window.localStorage.getItem('finishedBets');
		if(finishedBets) {
			finishedBets = JSON.parse(finishedBets);
		} else {
			finishedBets = [];
		}

		return finishedBets;
	}
});