var calculate = require('../../models/calculate')
var expect = require('chai').expect

describe('unit - calculate - model', function(){

  describe('calculate.compute', function(){
    var cacheData;
    beforeEach(function () {
      cacheData = {
        inputs: [],
        tokens: {mocha:'X', test:'I'},
        creditValue: {gold:9}
      }
    })

    it('should return an error if statement is not understood', function(){
      var invalidQuestion = 'invalid question'
      calculate.compute(cacheData, invalidQuestion)
        .then(function(result){
          expect(result).to.be.have.property('error','Cannot understand your inputs')
        })
    })

    it('should return the correct value of the how much question', function(){
      var validQuestion = 'how much is mocha test?'
      calculate.compute(cacheData, validQuestion)
        .then(function(result){
          expect(result).to.be.equal(11)
        })
    })

    it('should return the correct value of the how many question', function(){
      var validQuestion = 'how many credits is mocha test gold?'
      calculate.compute(cacheData, validQuestion)
        .then(function(result){
          expect(result).to.be.at.least(99)
        })
    })

  })

})