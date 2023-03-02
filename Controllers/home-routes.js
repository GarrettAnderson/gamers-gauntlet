const router = require('express').Router();



router.get('/', async (req, res) => {
    try {
   
  
      res.render('createplaceholder.handlebars');
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;