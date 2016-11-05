function Ticket(options) {
	var model = this;

	/* Properties */
	model.id;
	model.name;
	model.tax;
	model.ticketType;

	/* Public Methods */

	/* Initialization */
	init(options);

	/*********/
	function init(options) {
		model.id = (options && options.id) ? options.id : null;
		model.name = (options && options.name) ? options.name : null;
		model.tax = (options && options.tax) ? options.tax : 0;
		model.ticketType = (options && options.ticketType) ? options.ticketType : null;
	}
}