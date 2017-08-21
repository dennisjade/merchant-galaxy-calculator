/**
 * Convert the roman numeral to arabic
 * Return null if the value pass to be converted is wrong
 * @param value = Roman numeral pass to be converted
 * @returns {*}
 */
function convertToArabic(value){
  try {
    var toArabic = require('roman-numerals').toArabic;
    return toArabic(value);
  }catch(err){
    return null;
  }
}


module.exports = {
  convertToArabic:convertToArabic
};