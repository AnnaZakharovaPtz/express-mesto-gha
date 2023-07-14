const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const JWT_SECRET = 'some-secret-string-for-jwt';

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
