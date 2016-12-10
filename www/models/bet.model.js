function Bet(options) {
	var model = this;

	/* Properties */
	model.id;
	model.playerName;
	model.betAmount;
	model.tickets;
	model.maxJackpot = 15000;

	/* Public Methods */
	model.jackpot = jackpot;

	/* Initialization */
	init(options);

	/************/
	function init() {
		model.id = (options && options.id) ? options.id : null;
		model.playerName = (options && options.playerName) ? options.playerName : '';
		model.betAmount = (options && options.betAmount) ? options.betAmount : 0;
		model.tickets = (options && options.tickets) ? options.tickets : [];
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