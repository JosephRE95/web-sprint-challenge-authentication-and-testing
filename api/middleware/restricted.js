const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) res.status(400).json("token required");
  else {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (e) {
      console.log(e)
      res.status(401).json("token invalid");
    }
  }
};
