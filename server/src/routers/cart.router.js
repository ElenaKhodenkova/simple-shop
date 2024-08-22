const router = require('express').Router();
const { User, Cart, Product } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');
const { post } = require('./auth.router');


  router.get('/cart', verifyAccessToken, async (req, res) => {
    try {
      const cart = await Cart.findAll({ include: Product });
      res.json(cart)    
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })


  router.post('/cart', verifyAccessToken, async (req, res) => {
    const { productId } = req.body;
    const cart = await Cart.findOne({ where: { productId: productId }})
    if (cart) {
      cart.dataValues.count +=1;
      await cart.save();
    } else {
          await Cart.create ({productId: productId, count: 1})
        
      }
      res.json({ mesage: "Товар добавлен в корзину"})
  })


  router.get('/:id', async (req, res) => {
    const { user } = res.locals;
    try {
      const cart = await Cart.findAll({ include: [{model: Product}], where: { userId: req.params.id } });
      res.json(cart)    
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })


module.exports = router;
