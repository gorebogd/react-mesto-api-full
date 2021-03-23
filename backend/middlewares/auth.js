const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'dev-key',
    );
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
