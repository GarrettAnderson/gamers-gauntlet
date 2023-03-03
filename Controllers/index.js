const router = require('express').Router();

const homeroutes = require('./home-routes.js');

router.use('/', homeroutes);

module.exports = router;