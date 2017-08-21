
// Regex for validating input assignment
var valueRegEx = new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i);
var creditRegEx = new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i);

// Regex for validating input question
var howMuchRegEx = new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i);
var howManyRegEx = new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i);


/**
 * Parse the user input based on the different regex defined
 * @param input
 * @returns {*}
 */
function parse(input){
  var parseData;
  var valueData = valueRegEx.exec(input);
  var creditData = creditRegEx.exec(input);
  var howMuchData = howMuchRegEx.exec(input);
  var howManyData = howManyRegEx.exec(input);

  if (valueData){
    parseData = {
      data: valueData,
      type: 'value'
    };
  } else if (creditData){
    parseData = {
      data: creditData,
      type: 'credit'
    };
  } else if (howMuchData){
    parseData = {
      data: howMuchData,
      type: 'howMuch'
    };
  } else if (howManyData){
    parseData = {
      data: howManyData,
      type: 'howMany'
    };
  }

  return parseData;

};

module.exports = {
  parse: parse
};