var helpersCache = require('../../helpers/cache');
var expect = require('chai').expect;
var _ = require('underscore');
var rewire = require('rewire');
var sinon = require('sinon');

describe('unit - cache - helper', function(){

  describe('cache.get', function(){

    it('should return an initialize cache data', function(){
      helpersCache.get()
        .then(function(result){
          expect(result.tokens.length).to.be(0);
          expect(_.isEmpty(result.tokens)).to.be.true;
        })
    })

    it('should return some token from the cache', function(){
      var tokenData = 'some token data';
      helpersCache.set(tokenData)
        .then(function(){

          helpersCache.get()
            .then(function(result){
              expect(result.tokens.length).to.be.above(0);
              expect(_.isEmpty(result.tokens)).to.be.false;
            })

        })
    })

  })

  describe('cache.set', function(){

    it('should return the set cache token', function(){
      var tokenData = 'some token data';
      helpersCache.set(tokenData)
        .then(function(result){
          expect(result).to.be.equal(tokenData);
        })
    })

    it('should return an error when setting token', function(){
      var helpersCacheMock = rewire('../../helpers/cache');
      helpersCacheMock.__set__ = ("myCache", {
          set: sinon.stub().callsFake(function (cacheName, inputs, callback) {
            callback('error',false);
          })
        })

      helpersCacheMock.set('some data')
        .then(function(result){
          console.log('result', result);
        })
    })

  })

  describe('cache.del', function(){

    it('it should clear the cache data', function(){
      helpersCache.del()
        .then(function(result){
          expect(result).to.be.equal('Input cleared');
        })
    })

    it('should return an error when deleting cache data', function(){
      var helpersCacheMock = rewire('../../helpers/cache');
      helpersCacheMock.__set__ = {
        myCache: {
          del: sinon.stub().callsFake(function (cacheName, callback) {
            callback('error',0);
          })
        }
      }

      helpersCacheMock.del()
        .then(function(result){
          console.log('result', result);
        })
    })
  })

});