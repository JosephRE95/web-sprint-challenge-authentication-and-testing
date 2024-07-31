const router = require('express').Router();
const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json('Username and password required');
  }

  try {
    const hash = bcrypt.hashSync(password, 4);
    const response = await db('users').insert({ username, password: hash });
    const id = response[0];
    const user = await db('users').select('*').where({ id }).first();

    if (!user) {
      return res.status(400).json('There is no user with this username');
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res.status(500).json('Error registering the user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
  return res.status(400).json('username and password required');
  } else {
    const user = await db('users').select('*').where({ username }).first();
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json('invalid credentials');
    }
    const token = generateToken(user);
   return res.status(200).json({message: `welcome back ${username}`, token});
   
  }

});




function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, process.env.JWT_SECRET, options); // this method is synchronous
}


module.exports = router;
