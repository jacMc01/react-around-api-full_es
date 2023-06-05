const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No existe el Token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'super-strong-secret');

    req.user = {_id:decoded._id};
    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token invalido' });
  }
}

module.exports = auth;
