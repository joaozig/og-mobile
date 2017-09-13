function TicketType(options) {
	var model = this;

	/* Properties */
	model.id;
	model.name;
	model.game;
	model.tickets;

	/* Initialization */
	init(options);

	/**********/
	function init(options) {
		model.id = (options && options.id) ? options.id : null;
		model.name = (options && options.name) ? options.name : null;
		model.game = (options && options.game) ? options.game : null;
		model.tickets = (options && options.tickets) ? options.tickets : [];
	}
}