const router = require('express').Router();
const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY || 'shh';




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
    return res.status(500).json('Error registering the user', error);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password required' });
  }
  try {
    const user = await findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, username },  secret, { expiresIn: '1h' }); // 1st arg data, 2nd secret, 3rd expire
    res.json({ message: `welcome, ${username}`, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
