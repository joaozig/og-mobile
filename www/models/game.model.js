function Game(options) {
	var model = this;

	/* Properties */
	model.id;
	model.teamA;
	model.teamB;
	model.date;
	model.time;
	model.championship;

	/* Initialization */
	init(options);

	/*********/
	function init(options) {
		model.id = (options && options.id) ? options.id : null;
		model.teamA = (options && options.teamA) ? options.teamA : null;
		model.teamB = (options && options.teamB) ? options.teamB : null;
		model.date = (options && options.date) ? options.date : null;
		model.time = (options && options.time) ? options.time : null;
		model.championship = (options && options.championship) ? options.championship : null;
	}
}