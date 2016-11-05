function Championship(options) {
	var model = this;

	/* Properties */
	model.id;
	model.name;
	model.country;

	/* Initialization */
	init(options);

	/**********/
	function init(options) {
		model.id = (options && options.id) ? options.id : null;
		model.name = (options && options.name) ? options.name : null;
		model.country = (options && options.country) ? options.country : null;
	}
}