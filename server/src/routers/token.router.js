const router = require('express').Router();
const { verifyRefreshToken } = require('../../middlewares/verifyToken');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { user } = res.locals;
  const { accessToken, refreshToken } = generateToken({ user });

  res
    .cookie('refreshToken', refreshToken, cookieConfig.refreshToken)
    .json({ user, accessToken });
});

module.exports = router;
