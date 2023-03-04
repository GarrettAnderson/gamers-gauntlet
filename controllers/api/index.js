const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const projectRoutes = require('./projectRoutes');
const scoreRoutes = require('./scoreRoutes');


router.use('/users', userRoutes);
// router.use('/projects', projectRoutes);
router.use('/scores', scoreRoutes);


module.exports = router;
