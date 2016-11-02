angular.module('player')

.controller('PlayerController', function(BetService) {

	var vm = this;

	/* Properties */
	vm.bet = {};

	/* Public Methods */

	/* Initialization */
	init();

	/********/
	function init() {
		vm.bet = BetService.getBet();
	}
});