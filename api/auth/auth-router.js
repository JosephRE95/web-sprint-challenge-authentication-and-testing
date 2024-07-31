const router = require('express').Router();
const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper functions
function findByUsername(username) {
  return db('users').where({ username }).first();
}

function add(user) {
  return db('users').insert(user).then(([id]) => ({ id, ...user }));
}

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json('Username and password required');
  }

  try {
    const user = await findByUsername(username);
    if (user) {
      return res.status(409).json({ message: 'Username taken' });
    }

    const hash = bcrypt.hashSync(password, 4);
    const newUser = await add({ username, password: hash });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json('Error registering the user');
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json('Username and password required');
  }

  try {
    const user = await findByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json('Invalid credentials');
    }

    const token = generateToken(user);
    return res.status(200).json({ message: `Welcome back ${username}`, token });
  } catch (error) {
    return res.status(500).json('Error logging in');
  }
});

// Token generation function
function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options); // this method is synchronous
}

module.exports = router;
