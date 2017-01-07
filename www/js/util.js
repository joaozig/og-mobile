function Util() {

	/* Public Methods */
    this.formattedValue = function(value) {
        // returns the value with brazilian money format
        return number_format(value, 2, ',', '.');
    }

	this.formattedTaxValue = function(value) {
		return value.toString().replace('.', ',');
	}

    this.formatDate = function(date) {
        var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        var day = date.getDate();
        if(day <= 9) {
            day = '0' + day;
        }
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + '/' + monthNames[monthIndex] + '/' + year;
    }

    this.formatFilterDate = function(date) {
        var day = date.getDate();
        if(day <= 9) {
            day = '0' + day;
        }

        var month = date.getMonth() + 1;
        if(month <= 9) {
            month = '0' + month;
        }

        var year = date.getFullYear();

        return year+'-'+month+'-'+day
    }

    this.getMonday = function(d) {
      var d = new Date(d);
      var day = d.getDay();
      var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }

    this.getSunday = function(d) {
      var d = new Date(d);
      var day = d.getDay();
      var diff = (d.getDate() - day) + 7
      return new Date(d.setDate(diff));
    }

	/* Private Methods */
	function number_format (number, decimals, dec_point, thousands_sep) {
		// Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
    };

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    if (s[0].length > 3) {
    	s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
	}
}