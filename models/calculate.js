var parser = require('../helpers/parser');
var romanConverter = require('../helpers/roman-numerals');

/**
 *
 * @param cacheData
 * @param tokens
 * @returns {{value: string, error: string}}
 */
function getCacheValue(cacheData, tokens){

  // check if a particular token has not been assigned with value before
  var missingValue = null;
  var romanNumeral = '';
  var errorMsg = '';
  var value;

  for (var i = 0; i < tokens.length; i++){
    if ( !cacheData.tokens[tokens[i].toLowerCase()] ){
      missingValue = tokens[i];
      break;
    }
    romanNumeral += cacheData.tokens[tokens[i].toLowerCase()];
  };

  if (missingValue){
    errorMsg =  {
      error: missingValue + ' has not been assigned previously'
    };
  }

  value = romanConverter.convertToArabic(romanNumeral);

  if (!value){
    errorMsg = {
      error: romanNumeral + ' is an invalid roman numeral'
    };
  }

  return {value: value, error: errorMsg};
}

/**
 * Computes when the user starts to asked for "How much"
 * @param cacheData
 * @param parseQuestion
 * @returns {*}
 */
function computeHowMuch(cacheData, parseQuestion){
  var _parseQuestion =  parseQuestion[1].trim();
  if (_parseQuestion.length===0){
    return {error: 'Missing value to convert'};
  }

  var tmp = _parseQuestion.split(/\s+/);
  var cacheValue = getCacheValue(cacheData, tmp);

  if (cacheValue.error!==''){
    return cacheValue.error;
  } else {
    return cacheValue.value;
  }

}

/**
 * Compute when user starts to asked for "How many"
 * @param cacheData
 * @param parseQuestion
 * @returns {*}
 */
function computeHowMany(cacheData, parseQuestion){
  var _parseQuestion =  parseQuestion[1].trim();
  if (_parseQuestion.length===0){
    return {error: 'Missing value to convert'};
  }

  var tmp = _parseQuestion.split(/\s+/);
  var creditMineral = tmp.pop();

  // check if the last part has been use
  if (!cacheData.creditValue[creditMineral.toLowerCase()]){
    return {error: creditMineral + ' has not been defined'};
  }

  var cacheValue = getCacheValue(cacheData, tmp);

  if (cacheValue.error!==''){
    return cacheValue.error;
  } else{
    return cacheValue.value * cacheData.creditValue[creditMineral.toLowerCase()];
  }

}

/**
 * Compute and return the return or the error msg
 * @param cacheData
 * @param question
 */
function compute(cacheData, question){

  return new Promise(function(resolve, reject) {
    var parseQuestion = parser.parse(question);

    if (parseQuestion && parseQuestion.type==='howMuch'){
      return resolve(computeHowMuch(cacheData, parseQuestion.data));
    } else if (parseQuestion && parseQuestion.type==="howMany") {
      return resolve(computeHowMany(cacheData, parseQuestion.data));
    } else {
      return resolve({error: 'Cannot understand your inputs'});
    }

  });
}

module.exports = {
  compute: compute
};