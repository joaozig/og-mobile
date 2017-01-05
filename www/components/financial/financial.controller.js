angular.module('financial')

.controller('FinancialController', function($ionicPopup, FinancialService) {

	var vm = this;

	/* Properties */
	// vm.types = [
	// 	{type: "EM ANDAMENTO", bets: [{"name":"maria","hash":"","date":"23\/08\/2016","hour":"14:07h","betAmount":"3,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"carlos","hash":"05f4731ef8900f57a27546003632f0821","date":"31\/08\/2016","hour":"14:56h","betAmount":"10,00","jackpot":"0,00","quantityBets":"2","hits":"1"},{"name":"jonas","hash":"05f4731ef8900f57a27546003632f0823","date":"31\/08\/2016","hour":"20:24h","betAmount":"32,00","jackpot":"0,00","quantityBets":"2","hits":"0"},{"name":"carlos","hash":"05f4731ef8900f57a27546003632f082","date":"31\/08\/2016","hour":"23:21h","betAmount":"34,00","jackpot":"1.414,40","quantityBets":"2","hits":"1"},{"name":"kaio","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:17h","betAmount":"100,00","jackpot":"0,00","quantityBets":"4","hits":"1"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:37h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:40h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:40h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:41h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:41h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:41h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:42h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"luiz","hash":"25353102aba6475e983441443775b13d","date":"09\/09\/2016","hour":"16:31h","betAmount":"950,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"poio","hash":"11adb8aa657b88b9e47b13e78342c233","date":"09\/09\/2016","hour":"17:48h","betAmount":"120,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"kola","hash":"683eeae85bd1983c814dc3576b9055af","date":"09\/09\/2016","hour":"18:33h","betAmount":"122,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"Raio","hash":"400c7f0aaba33ac5f8dc6dfe5e36eda9","date":"09\/09\/2016","hour":"20:06h","betAmount":"200,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"Jiu","hash":"a96914d7cfdb0556bba1e8c364e686e1","date":"09\/09\/2016","hour":"20:08h","betAmount":"320,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"Joia","hash":"c4880d6e6b0b52d02a4e38375b06f943","date":"09\/09\/2016","hour":"20:36h","betAmount":"320,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"Vaia","hash":"a9825896f76c9d54cdfa9e15349bcff7","date":"12\/09\/2016","hour":"20:49h","betAmount":"200,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"Aeporra","hash":"f37bc570ecbf299562dcb04857cb6d66","date":"12\/09\/2016","hour":"21:04h","betAmount":"320,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"ds","hash":"d8f961b48d1761e3d1c1ec92672c3e35","date":"15\/09\/2016","hour":"16:49h","betAmount":"456,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"d","hash":"1c963fd5c2be60b0d3ba1e53d33c899e","date":"15\/09\/2016","hour":"17:00h","betAmount":"122,00","jackpot":null,"quantityBets":"2","hits":"0"},{"name":"123","hash":"c21dc416506b43af0f6dc6e87c7928bf","date":"26\/09\/2016","hour":"13:08h","betAmount":"123,00","jackpot":null,"quantityBets":"2","hits":"0"}]},
	// 	{type: "PREMIADOS", bets: [{"name":"fernando","hash":"05f4731ef8900f57a27546003632f082","date":"31\/08\/2016","hour":"17:40h","betAmount":"44,00","jackpot":"3,00","quantityBets":"1","hits":"1"},{"name":"klo","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"17:12h","betAmount":"100,00","jackpot":null,"quantityBets":"1","hits":"1"},{"name":"leo","hash":"05f4731ef8900f57a27546003632f082","date":"08\/09\/2016","hour":"19:40h","betAmount":"100,00","jackpot":null,"quantityBets":"1","hits":"1"},{"name":"cacaca","hash":"b9e179f5aa4aeb29f4466120e8efc861","date":"08\/09\/2016","hour":"23:33h","betAmount":"100,00","jackpot":"1.464,00","quantityBets":"2","hits":"2"}]},
	// 	{type: "NÃO PREMIADOS", bets: [{"name":"karai","hash":"05f4731ef8900f57a27546003632f082","date":"31\/08\/2016","hour":"20:32h","betAmount":"54,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:43h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"32","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:43h","betAmount":"20,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"awdryn","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:45h","betAmount":"120,00","jackpot":"0,00","quantityBets":"1","hits":"0"},{"name":"ed","hash":"05f4731ef8900f57a27546003632f082","date":"01\/09\/2016","hour":"15:46h","betAmount":"100,00","jackpot":"0,00","quantityBets":"1","hits":"0"}]}
	// ];

	vm.shownGroup = [true, true, true];
	vm.hideLoadingSpinner = false;
	vm.initialDate;
	vm.finalDate;

	/* Public Methods */
  vm.toggleGroup = toggleGroup;
  vm.typeClass = typeClass;
  vm.getMonday = getMonday;
  vm.getSunday = getSunday;
  vm.formatDate = formatDate;
  vm.prevDate = prevDate;
  vm.nextDate = nextDate;

	/* Initialization */
	init();

	/**********/

	function init() {

		var date = new Date();
		setDates(date);

		FinancialService.getBets().then(
			function(data) {
				var types = [data[0], data[1], data[2]];
				var resume = data[3];
				vm.types = types;
				vm.hideLoadingSpinner = true;
			},
			function(errorMessage) {
				$ionicPopup.alert({
					title: 'Algo falhou :(',
					template: errorMessage
				});
			}
		);
	}

	function setDates(date) {
		vm.initialDate = vm.getMonday(date);
		vm.finalDate = vm.getSunday(date);
	}

	function toggleGroup(index) {
    vm.shownGroup[index] = !vm.shownGroup[index];
  };

  function typeClass(typeIndex) {
  	if(typeIndex == 0) {
  		return 'item-dark';
  	} else if(typeIndex == 1) {
  		return 'item-positive';
  	} else if(typeIndex == 2) {
  		return 'item-assertive';
  	}
  }

  function prevDate() {
  	vm.hideLoadingSpinner = false;
  	setDates(vm.initialDate.setDate(vm.initialDate.getDate() - 2));
  }

  function nextDate() {
  	vm.hideLoadingSpinner = false;
		setDates(vm.finalDate.setDate(vm.finalDate.getDate() + 2));
  }

	function getMonday(d) {
	  var d = new Date(d);
	  var day = d.getDay();
	  var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	  return new Date(d.setDate(diff));
	}

	function getSunday(d) {
	  var d = new Date(d);
	  var day = d.getDay();
	  var diff = (d.getDate() - day) + 7
	  return new Date(d.setDate(diff));
	}

	function formatDate(date) {
		var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
		var day = date.getDate();
		if(day <= 9) {
			day = '0' + day;
		}
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		return day + '/' + monthNames[monthIndex] + '/' + year;
	}
});