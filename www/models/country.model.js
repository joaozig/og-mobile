function Country(options) {
	var model = this;

	/* Properties */
	model.id;
	model.name;
	model.sport;

	/* Initialization */
	init(options);

	/********/
	function init(options) {
		model.id = (options && options.id) ? options.id : null;
		model.name = (options && options.name) ? options.name : null;
		model.sport = (options && options.sport) ? options.sport : null;
	}
}