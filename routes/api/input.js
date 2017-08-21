var router = require('express').Router();
var helpersCache = require('../../helpers/cache');
var modelTokenizer = require('../../models/tokenizer');

/**
 * Add items to the cache; Push an array format
 */
router.post('/', function(req, res, next) {

  var input = req.body.input;

  // get the cache items first so we can append to it
  helpersCache.get()
    .then(function(result){

      var tokens = modelTokenizer.tokenize(result, input)

      // return immediately if user input cannot be parse
      if (!tokens || tokens.error){
        return res.send(tokens.error);
      }

      // add the input item to the existing cache
      result = tokens;
      result.inputs.push(input);

      // set the cache items
      helpersCache.set(result)
        .then(function(results){
          return res.send(results);
        });
    })

});

/**
 * Get the items in the cache; Expected is in array format
 */
router.get('/', function(req, res){

  helpersCache.get()
    .then(function(result){
      res.send(result);
    });

});

/**
 * Delete the cache items
 */
router.delete('/', function(req, res){

  helpersCache.del()
    .then(function(result){
      res.send(result);
    });

});

router.post('/bulk', function(req, res){
  var obj = {
    "inputs": [
      "glob is I",
      "prok is V",
      "pish is X",
      "tegj is L",
      "glob glob Silver is 34 Credits",
      "glob prok Gold is 57800 Credits",
      "pish pish Iron is 3910 Credits"
    ],
    "tokens": {
      "glob": "I",
      "error": "",
      "prok": "V",
      "pish": "X",
      "tegj": "L"
    },
    "creditValue": {
      "silver": 17,
      "gold": 14450,
      "iron": 195.5
    },
    "error": ""
  }
  helpersCache.set(obj);
  res.send('Test data saved in cache');
});

module.exports = router;
