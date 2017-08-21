var tokenizer = require('../../models/tokenizer')
var expect = require('chai').expect

describe('unit - tokenizer - model', function(){

  describe('tokenizer.tokenize', function(){
    var cacheData;
    beforeEach(function () {
      cacheData = {
        inputs: [],
        tokens: {},
        creditValue: {}
      }
    })

    it('should return an error when statement is not understood', function(){
      var invalidInput = 'invalid value input'
      cacheData = tokenizer.tokenize(cacheData, invalidInput)
      expect(cacheData.error).to.be.equal('Cannot understand your inputs');
    })

    it('should return a token attribute for a valid input', function(){
      var validValueInput = 'test is I'
      cacheData = tokenizer.tokenize(cacheData, validValueInput)
      expect(typeof cacheData).to.be.equal('object')
      expect(cacheData.tokens.error).to.be.equal('')
      expect(cacheData.tokens.test).to.be.equal('I');
    })

    it('should return a credit value attribute for a valid input', function(){
      var validValueInput = 'mocha test gold is 100 credits'
      cacheData.tokens = {
        mocha: 'X',
        test: 'I'
      }
      cacheData = tokenizer.tokenize(cacheData, validValueInput)
      expect(typeof cacheData).to.be.equal('object')
      expect(cacheData.creditValue.gold).to.be.above(0);
    })

    it('should return an error of some of the token was not previously define', function(){
      var input = 'mocha test gold is 100 credits'
      cacheData = tokenizer.tokenize(cacheData, input)
      expect(typeof cacheData).to.be.equal('object')
      expect(cacheData.creditValue.error).to.match(/has not been assigned previously/)
    })

    it('should return an error when mineral is use as value at the same time', function(){
      var input = 'mocha test is 100 credits'
      cacheData.tokens = {
        mocha: 'X',
        test: 'I'
      }
      cacheData = tokenizer.tokenize(cacheData, input)
      expect(typeof cacheData).to.be.equal('object')
      expect(cacheData.creditValue.error).to.match(/has been used as a value assignment/)
    })

    it('should return a token attribute for a valid input', function(){
      var input = 'mocha test gold is 100 credits'
      cacheData.tokens = {
        mocha: 'X',
        test: 'M'
      }
      cacheData = tokenizer.tokenize(cacheData, input)
      expect(typeof cacheData).to.be.equal('object')
      expect(cacheData.creditValue.error).to.match(/is an invalid roman numeral/)
    })

  })

})