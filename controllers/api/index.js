const router = require('express').Router();
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');

router.use('/users', userRoutes);
router.use('/quizzes', quizRoutes);

module.exports = router;