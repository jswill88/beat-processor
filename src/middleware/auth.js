const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  try {
    const { token } = req.cookies;
    console.log('req', req);
    if (!token || token === 'undefined') {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;
    next();
  } catch (e) {
    next({
      status: 401,
      message: 'Unauthorized',
    });
  }
};
