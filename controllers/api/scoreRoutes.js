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

router.post('/', async (req, res) => {
    console.log('post score route hit:', req.body)
    try {
        const newScore = await Score.create({
        ...req.body,
        user_id: req.session.user_id
        });
        console.log(newScore)
        res.status(200).json(newScore);
    } catch (err) {
        res.status(400).json(err);
    }
  });

router.delete('/:id', async(req, res) => {
    try {
        const deleteScore = await Score.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deleteScore) {
            res.status(404).json({message: 'No score with that id'})
            return
        }
        res.status(200).json(deleteScore)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router