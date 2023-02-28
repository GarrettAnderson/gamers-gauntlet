const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Login user

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    req.session.user_id = user.id;
    req.session.email = user.email;
    req.session.logged_in = true;

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for user logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;