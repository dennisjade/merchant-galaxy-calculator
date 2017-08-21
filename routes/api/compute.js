var router = require('express').Router();
var helpersCache = require('../../helpers/cache');
var modelsCalc = require('../../models/calculate');


router.get('/', function(req, res){

  // get the list of items in the cache for computation
  var question = req.query.question;
  helpersCache.get()
    .then(function(result){

      // compute for answers
      modelsCalc.compute(result, question)
        .then(function(ans){
          res.send(ans.toString());
        })

    });

});



module.exports = router;
