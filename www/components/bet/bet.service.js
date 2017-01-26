angular.module('bet')
.constant('BET', 'bet')
.service('BetService', function(BET, $q, $http, LoginService, MainService) {

	var service = this;

	/* Properties */
	service.minBetAmount = 2;
	service.maxBetAmount = 150;

	/* Public Methods */
	service.addBet = addBet;
	service.editBet = editBet;
	service.getBet = getBet;
	service.getTicketByGameFromBet = getTicketByGameFromBet;
	service.getFinishedBet = getFinishedBet;
	service.removeBet = removeBet;
	service.removeInvalidTickets = removeInvalidTickets;
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

	function getTicketByGameFromBet(game) {
		var bet = service.getBet();
		var ticket = null;

		if (bet) {
			var ticket = null;
			bet.tickets.forEach(function(t) {
				if (t.ticketType.game.id == game.id) {
					ticket = t;
				}
			});
		}

		return ticket;
	}

	function getFinishedBet(betHash) {

		var deferred = $q.defer();

		var url = MainService.apiUrl + '/includes/inc.getbets.php?hash='+betHash;

		$http.get(url)
	    .success(function(data, status, headers,config){
	      deferred.resolve(data);
	    })
	    .error(function(data, status, headers,config){
	      deferred.reject('Não foi possível recuperar a aposta.');
	    })

	  return deferred.promise;
	}

	function removeBet() {
		window.localStorage.removeItem(BET);
		return (service.getBet() == null);
	}

	function removeInvalidTickets(tickets) {
		var bet = service.getBet();
		var newTickets = [];
		bet.tickets.forEach(function(i){
		  if(tickets.indexOf(i.id) == -1){
		    newTickets.push(i);
		  } 
		});
		bet.tickets = newTickets;
		saveBet(bet);
	}

	function finishBet() {
		var bet = service.getBet();
		var deferred = $q.defer();

		if(bet) {
			bet.seller = LoginService.getUser();
			bet.date = new Date().toLocaleString('pt');
			var params = {
				id: bet.id,
				playerName: bet.playerName,
				seller: bet.seller.id,
				betAmount: bet.betAmount,
				jackpot: bet.jackpot(),
				tickets: bet.tickets,
				date: bet.date
			}

			params.tickets = params.tickets.map(function(t){
				return t.id+'#'+t.tax;
			});

			var url = MainService.apiUrl + '/includes/inc.bets.php';

			$http({url: url, method: "POST", data: 'playerName='+params.playerName+'&seller='+params.seller+'&betAmount='+params.betAmount+'&jackpot='+params.jackpot+'&tickets[]='+params.tickets, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
		    .success(function(data, status, headers,config){
		    	deferred.resolve(data);
		    })
		    .error(function(data, status, headers,config){
		      deferred.reject('Falha ao finalizar aposta');
		    })

		} else {
			deferred.reject('Nenhuma aposta ativa');
		}

		return deferred.promise;
	}

	function addTicket(ticket) {
		var deferred = $q.defer();
		var bet = service.getBet();

		if(!bet) {
			deferred.reject('Aposta não encontrada.');
		}

		if(!validateTicketDate(ticket)){
			deferred.reject('Tempo esgotado para apostas nesse jogo.');
		} else if(!validateUniqueTicket(bet, ticket)) {
			deferred.reject('Você já escolheu um palpite para esse jogo.');
		} else {
			bet.tickets.push(ticket);
			saveBet(bet);
			deferred.resolve();
		}

		return deferred.promise;
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

	function validateTicketDate(ticket) {
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

	function validateUniqueTicket(bet, ticket) {
		var validate = true;

		bet.tickets.forEach(function(currentTicket) {
			if(currentTicket.ticketType.game.id == ticket.ticketType.game.id) {
				validate = false;
			}
		});

		return validate;
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