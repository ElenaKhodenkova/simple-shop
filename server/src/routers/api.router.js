const router = require('express').Router();
const productsRouter = require('./products.api.router.js');
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const cartRouter = require('./cart.router')

router.use('/products', productsRouter);
router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);
router.use('/carts', cartRouter);

module.exports = router;
