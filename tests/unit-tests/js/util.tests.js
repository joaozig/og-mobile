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
});