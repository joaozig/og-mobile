describe('Util', function() {
	var util;

	beforeEach(function() {
		util = new Util();
	});

	describe('#formattedValue', function() {
		describe('when is a value minor than a thousand', function() {
			it("should return decimals separated by ','", function() {
				expect(util.formattedValue(1)).toEqual("1,00");
				expect(util.formattedValue(23.4)).toEqual("23,40");
				expect(util.formattedValue(530.92)).toEqual("530,92");
			});
		});
		describe('when is a value major than a thousand', function() {
			it("should return decimals separated by ',' an thousands separated by '.'", function() {
				expect(util.formattedValue(1000)).toEqual("1.000,00");
				expect(util.formattedValue(2330.4)).toEqual("2.330,40");
				expect(util.formattedValue(53000.92)).toEqual("53.000,92");
				expect(util.formattedValue(1000000.92)).toEqual("1.000.000,92");
			});
		});
	});

	describe('#formattedTaxValue', function() {
		describe('when is a integer', function() {
			it("should return the same toString() value", function() {
				expect(util.formattedTaxValue(1)).toEqual('1');
			});
		});
		describe('when has just 1 decimal place', function() {
			it("should return the same toString value with '.' replaced by ','", function() {
				expect(util.formattedTaxValue(23.4)).toEqual("23,4");
			});
		});
		describe('when has 2 decimals place', function() {
			it("should return the same toString value with '.' replaced by ','", function() {
				expect(util.formattedTaxValue(23.45)).toEqual("23,45");
			});
		});
	});
});