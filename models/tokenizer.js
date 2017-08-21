var parser = require('../helpers/parser');
var romanConverter = require('../helpers/roman-numerals');

/**
 *
 * @param cacheData
 * @param token
 */
function valueFormat(cacheData, token){
  var tmp = token[0].split(/\s+/);

  // set the item and overwrite if existing
  cacheData[tmp[0].toLowerCase()] = tmp[2].toUpperCase();

  cacheData.error = '';
  return cacheData;
}

/**
 *
 * @param cacheData
 * @param token
 */
function creditFormat(cacheData, token){
  var _token = token[1].trim();

  // check if there is no value defined for credit
  // if (_token.length===0){
  //   return {error:"Missing value for credits"};
  // }

  var tmp = _token.split(/\s+/);
  var creditMineral = tmp.pop();

  // check if the last part has been use
  if (cacheData.tokens[creditMineral.toLowerCase()]){
    return {error: creditMineral + ' has been used as a value assignment'};
  }

  // check if a particular token has not been assigned with value before
  var missingValue = null;
  var romanNumeral = '';
  for (var i = 0; i < tmp.length; i++){
    if ( !cacheData.tokens[tmp[i].toLowerCase()] ){
      missingValue = tmp[i];
      break;
    }
    romanNumeral += cacheData.tokens[tmp[i].toLowerCase()];
  };

  if (missingValue){
    return {error: missingValue + ' has not been assigned previously'};
  }

  var credits = parseFloat(token[2]);
  var value = romanConverter.convertToArabic(romanNumeral);

  if (!value){
    return {error: romanNumeral + ' is an invalid roman numeral'};
  }

  cacheData.creditValue[creditMineral.toLowerCase()] = credits / value;
  cacheData.error = '';
  return cacheData.creditValue;
}


/**
 * Tokenize the user given assignment
 * @param cacheData
 * @param input
 * @returns {*}
 */
function tokenize(cacheData, input){
  var token = parser.parse(input);

  if (token && token.type==='value') {
    cacheData.tokens = valueFormat(cacheData.tokens, token.data);
    return cacheData;
  }else if (token && token.type==='credit') {
    cacheData.creditValue = creditFormat(cacheData, token.data);
    return cacheData;
  }else if (token && token.type==="howMuch") {
    return token;
  }else if (token && token.type==='howMany') {
    return token;
  }else{
    return {error: 'Cannot understand your inputs'};
  }
}

module.exports = {
  tokenize:tokenize
};