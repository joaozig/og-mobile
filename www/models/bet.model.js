function Bet(options) {
	var model = this;

	/* Properties */
	model.playerName;
	model.betAmount;
	model.tickets;

	/* Public Methods */
	model.jackpot = jackpot;

	/* Initialization */
	init(options);

	/************/
	function init() {
		model.playerName = (options && options.playerName) ? options.playerName : '';
		model.betAmount = (options && options.betAmount) ? options.betAmount : 0;
		model.tickets = (options && options.tickets) ? options.tickets : [];
	}

	function jackpot() {
		var amount = 0;

		model.tickets.forEach(function(ticket) {
			amount += (ticket.tax * model.betAmount);
		});

		return amount;
	}
}