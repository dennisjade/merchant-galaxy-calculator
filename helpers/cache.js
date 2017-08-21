var NodeCache = require( "node-cache" );
var myCache = new NodeCache();
var config = require('../config');
var cacheName = config.cacheName;

/**
 * Get the value in the cache
 */
function get(){
  return new Promise(function (resolve, reject){

    myCache.get(cacheName, function (err, value) {
      if (!err) {
        if (value == undefined) {
          var initCache = {
            inputs: [],
            tokens: {},
            creditValue: {}
          };
          return resolve(initCache);
        } else {
          return resolve(value);
        }
      }
    });

  });
}

/**
 * Set some update the cache
 * @param inputs
 */
function set(inputs){
  return new Promise(function(resolve, reject){

    myCache.set( cacheName, inputs, function( err, success ){
      if( !err && success ){
        return resolve(inputs);
      } else {
        return resolve(err);
      }
    });

  })
}

/**
 * Delete the cache stored
 */
function del(){
  return new Promise(function(resolve, reject){

    myCache.del( cacheName, function( err, count ) {
      if (err) {
        return resolve(err);
      } else {
        return resolve('Input cleared');
      }
    });

  })
}

module.exports = {
  set: set,
  get: get,
  del: del
}