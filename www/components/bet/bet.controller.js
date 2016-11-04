angular.module('bet')

.controller('BetController', function(BetService) {
	var vm = this;
	vm.util = new Util();

	/* Properties */
	vm.bet = null;

	/* Initialization */
	init();

	/*********/
	function init() {
		vm.bet = BetService.getBet();
	}
});