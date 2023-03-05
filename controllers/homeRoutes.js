const router = require('express').Router();
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const scores = scoreData.map((score) => score.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      scores, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/results', withAuth, async (req, res) => {
  try {
  //   // Find the logged in user based on the session ID
  //   const userData = await User.findByPk(req.session.user_id, {
  //     attributes: { exclude: ['password'] },
  //     include: [{ model: Score }],
  //   });

  //   const user = userData.get({ plain: true });
  const scoreData = await Score.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });

  // Serialize data so the template can read it
  const scores = scoreData.map((score) => score.get({ plain: true }));

  // Pass serialized data and session flag into template
    res.render('results', {
      // ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quiz', (req, res) => {
  res.render('quiz', { 
      logged_in: true 
    });

});

router.get('/createaccount', (req, res) => {
  res.render('createaccount', { 
    logged_in: false 
  });;
});

router.get('/highscores', async (req, res) => {
  
  const scoreData = await Score.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  
  const scores = scoreData.map((score) => score.get({ plain: true }));
  console.log('scores:', scores)
  const highScores = scores.filter((score) => score.score >= 5)
  // const scores = [{score: 70}]
  console.log('highscores', highScores)
  res.render('highscores', { 
    scores: scores,
    // logged_in: false 
  });;
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // 
  if (req.session.logged_in) {
    res.redirect('/quiz');
    return;
  }

  res.render('login');
});

module.exports = router;
