var romanNumeral = require('../../helpers/roman-numerals');
var expect = require('chai').expect;

describe('unit - roman numeral - helper', function(){

  describe('romanNumeral.convertToArabic', function(){

    it('should return null if roman numeral string pass is invalid', function() {
      var invalidRomanNumeral = 'XM';
      var value = romanNumeral.convertToArabic(invalidRomanNumeral)
      expect(value).to.be.equal(null)
    });

    it('should return null if no value is pass', function() {
      var value = romanNumeral.convertToArabic()
      expect(value).to.be.equal(null)
    });

    it('should return the correct arabic value of a roman numeral', function(){
      var validRomanNumeral = 'IX'
      var value = romanNumeral.convertToArabic(validRomanNumeral)
      expect(value).to.be.equal(9)
    })

  })
})