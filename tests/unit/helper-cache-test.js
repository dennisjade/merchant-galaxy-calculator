var expect = require('chai').expect;
var _ = require('underscore');
var rewire = require('rewire');
var sinon = require('sinon');
var helpersCache = rewire('../../helpers/cache');

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
      helpersCache.__with__({
        myCache: {
          set: sinon.stub().callsFake(function (cacheName, input, callback) {
            callback({error:'Test error for setting cache'}, false);
          })
        }
      })(function(){
        helpersCache.set('some data')
          .then(function(result) {
            expect(result).to.have.property('error','Test error for setting cache')
          })
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
      helpersCache.__with__({
        myCache: {
          set: sinon.stub().callsFake(function (cacheName, input, callback) {
            callback({error:'Test error for deleting cache'}, false);
          })
        }
      })(function(){
        helpersCache.del()
          .then(function(result) {
            expect(result).to.have.property('error','Test error for deleting cache')
          })
      })
    })

  })

});