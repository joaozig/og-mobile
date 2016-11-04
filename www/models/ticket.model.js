function Ticket(options) {
	var model = this;

	/* Properties */
	model.id;
	model.tax;

	/* Public Methods */

	/* Initialization */
	init(options);

	/*********/
	function init(options) {
		model.id = (options && options.id) ? options.id : null;
		model.tax = (options && options.tax) ? options.tax : 0;
	}
}