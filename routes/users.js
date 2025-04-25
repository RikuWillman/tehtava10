const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const createToken = require('../createtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      isadmin: req.body.isadmin || false,
    });
    await user.save();
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = createToken(user);
    res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
