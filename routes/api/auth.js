const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route get api/auth
//@desc valid auth
//@access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error' });
  }
});

//@route get api/users
//@desc Register route
//@access Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log('Request Body:');
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Check if user exists
      let user = await User.findOne({ email });
      console.log('User:');
      console.log(user);
      if (!user) {
        return res.status(400).json({ errors: { msg: 'Invalid credentials' } });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: { msg: 'Invalid credentials' } });
      }
      const payload = {
        user: { id: user.id }
      };

      //Return jsonwebtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
