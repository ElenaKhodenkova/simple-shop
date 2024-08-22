const router = require('express').Router();
const { User, Cart } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');
const { post } = require('./auth.router');



router.get('/:id', verifyAccessToken, async (req, res) => {
    const { user } = res.locals;
    try {
      const cart = await Cart.findAll({ where: { userId: user.id } });
      res.json(cart)    
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  router.post('/cart', async (req, res) => {
    const { product } = req.body;
    const cartItem = await Cart.findOne({ where: { productId: product.id }})
    
  })
module.exports = router;
