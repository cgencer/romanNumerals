var expect    	= require("chai").expect;
var assert		= require('chai').assert;
var converter 	= require("../app/converter");
var regEx = /(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)/ig;

var regEx = /(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})/ig;
var testValues = [
	{input: null, 			expected: null}, 
	{input: '', 			expected: null}, 
	{input: 0, 				expected: null}, 
	{input: 1, 				expected: null}, 
	{input: 3, 				expected: null}, 
	{input: 4, 				expected: null}, 
	{input: 5, 				expected: null}, 
	{input: 'I', 			expected: 1}, 
	{input: 'III', 			expected: 3}, 
	{input: 'IIII', 		expected: 4}, 
	{input: 'IV', 			expected: 4}, 
	{input: 'V', 			expected: 5}, 
	{input: 1968, 			expected: null}, 
	{input: '1473', 		expected: null}, 
	{input: 2999, 			expected: null}, 
	{input: 3000, 			expected: null}, 
	{input: 10000, 			expected: null}, 
	{input: 'CDXXIX', 		expected: 429}, 
	{input: 'CD1X', 		expected: null}, 
	{input: 'error', 		expected: null}, 
	{input: 'MCDLXXXII', 	expected: 1482}, 
	{input: 'MCMLXXX', 		expected: 1980}, 
	{input: 'MMMMCMXCIX', 	expected: 4999}, 
	{input: 'MMMMDMXCIX', 	expected: null}
];

describe("Roman Numerals converter tests...", function() {

	describe("Roman to Latin conversion", function() {

	 	testValues.forEach( function(test) {
			it('trying to convert ' + test.input + ' (='+test.expected+') of type ' + typeof(test.input) + ' into Latin', function(done) {

				try {

					expect( test.input )
						.to.be.a('string')
						.to.match(regEx);

				} catch(e) {
/*
					if (e instanceof SyntaxError) {
						console.log('\tinvalid value.');
					}else if(e instanceof RangeError) {
						console.log('\tinvalid range.');
					}else{
//						console.log('other error: ' + e.message);
						console.log('\tTest R2L: couldnt determine the roman numerals trough regexp');
					}
*/
				}				

				expect( converter.romanToLatin( test.input ) )
						.to.be.a('number')
						.to.be.within(1, 3999);

				done();
			});
		});
	});


	describe("Latin to Roman conversion", function() {
	 	testValues.forEach(function(test) {
			if( Number.isInteger(test.expected) ) {
				it('trying to convert ' + test.expected + ' into Roman Numerals', function(done) {

					expect( parseInt(test.expected) )
							.to.be.a('number')
							.to.be.within(1, 3999);

					try {
						expect( converter.latinToRoman(test.expected) )
							.to.be.a('string')
							.to.match(regEx);
					} catch(e) {

						if (e instanceof SyntaxError) {
							console.log('\tinvalid value.');
						}else if(e instanceof RangeError) {
							console.log('\tinvalid range.');
						}else{
//							console.log('other error: ' + e.message);
							console.log('\tTest L2R: couldnt determine the roman numerals \''+test.input+'\' trough regexp \n\t('+e+')')
						}
					}


					done();
				});
			}
		});
	});


});
