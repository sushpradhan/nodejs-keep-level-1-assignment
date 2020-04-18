const router = require('express').Router();


router.use('/users',require('./users'));

router.use('/notes',require('./notes'));

module.exports = router;
