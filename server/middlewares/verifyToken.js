const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid refresh', error);
    res.status(400).json({ message: 'Invalid refresh' });
  }
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log(accessToken);
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid access');
    res.status(400).json({ message: 'Invalid access' });
  }
};

module.exports = { verifyRefreshToken, verifyAccessToken };
