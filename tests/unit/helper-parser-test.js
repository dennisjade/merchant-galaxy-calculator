var expect = require('chai').expect;
var parser = require('../../helpers/parser');

describe('unit - parser - helper', function(){

  describe('parser.parse', function(){

    it('should return undefined if no input is pass', function(){
      var tokens = parser.parse();
      expect(tokens).to.be.equal(undefined);
    })

    it('should return undefined if inout is not recognized', function(){
      var tokens = parser.parse('not recognize input');
      expect(tokens).to.be.equal(undefined);
    })

    it('should return an object with "value" as value of type',function(){
      var tokens = parser.parse('test is I');
      expect(typeof tokens).to.be.equal('object')
      expect(tokens.type).to.be.equal('value');
    })

    it('should return an object with "credit" as value of type',function(){
      var tokens = parser.parse('mocha test gold is 100 credits');
      expect(typeof tokens).to.be.equal('object')
      expect(tokens.type).to.be.equal('credit');
    })

    it('should return an object with "howMuch" as value of type',function(){
      var tokens = parser.parse('how much is mocha test?');
      expect(typeof tokens).to.be.equal('object')
      expect(tokens.type).to.be.equal('howMuch');
    })

    it('should return an object with "howMany" as value of type',function(){
      var tokens = parser.parse('how many credits is mocha test gold?');
      expect(typeof tokens).to.be.equal('object')
      expect(tokens.type).to.be.equal('howMany');
    })

    it('should return undefined if no question mark at the end of a question pattern',function(){
      var tokens = parser.parse('how many credits is mocha test gold');
      expect(tokens).to.be.equal(undefined);
    })

    it('should return undefined if there are any other character after the question mark',function(){
      var tokens = parser.parse('how many credits is mocha test gold');
      expect(tokens).to.be.equal(undefined);
    })

  })

})