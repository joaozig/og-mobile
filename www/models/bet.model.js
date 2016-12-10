function Bet(options) {
	var model = this;

	/* Properties */
	model.id;
	model.playerName;
	model.betAmount;
	model.tickets;

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
		var amount = model.betAmount;

		model.tickets.forEach(function(ticket) {
			amount = (ticket.tax * amount);
		});

		// if(amount > 1000) {
		// 	amount = 1000;
		// }

		return amount;
	}
}