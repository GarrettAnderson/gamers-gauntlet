const router = require('express').Router();
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');

router.get('/results', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const scores = scoreData.map((score) => score.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('results', { 
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
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Score }],
    });

    const user = userData.get({ plain: true });

    res.render('quiz', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quiz', withAuth, (req, res) => {
  // try {
    res.render('quiz', {
      logged_in: true
    });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
})

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
