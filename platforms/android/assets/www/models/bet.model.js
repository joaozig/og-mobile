function Bet(options) {
	var model = this;

	/* Properties */
	model.util = new Util();
	model.id;
	model.playerName;
	model.seller;
	model.betAmount;
	model.tickets;
	model.date;
	model.maxJackpot = 15000;

	/* Public Methods */
	model.getBetAmount = getBetAmount;
	model.getJackpot = getJackpot;
	model.jackpot = jackpot;

	/* Initialization */
	init(options);

	/************/
	function init() {
		model.id = (options && options.id) ? options.id : null;
		model.playerName = (options && options.playerName) ? options.playerName : '';
		model.seller = (options && options.seller) ? options.seller : null;
		model.betAmount = (options && options.betAmount) ? options.betAmount : 0;
		model.tickets = (options && options.tickets) ? options.tickets : [];
		model.date = (options && options.date) ? options.date : null;
	}

	function getBetAmount() {
		return model.util.formattedValue(model.betAmount);
	}

	function getJackpot() {
		return model.util.formattedValue(model.jackpot());
	}

	function jackpot() {
		var amount = 0;

		model.tickets.forEach(function(ticket) {
			if (amount == 0) {
				amount = model.betAmount;
			}

			amount = (ticket.tax * amount);
		});

		if(amount > model.maxJackpot) {
			amount = model.maxJackpot;
		}

		return amount;
	}
}