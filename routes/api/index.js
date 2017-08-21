var router = require('express').Router();

router.use('/input', require('./input'));
router.use('/compute', require('./compute'));

module.exports = router;