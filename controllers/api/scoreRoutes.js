const router = require('express').Router();
const { User, Score } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const getScores = await Score.findAll({
        include: {
          model: User
        }
      })
  
      res.status(200).json(getScores)
    } catch (err) {
      res.status(500).json(err)
    }
  })

module.exports = Score