const router = require('express').Router();
const { User, Cart, Product } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');
const { post } = require('./auth.router');

router.get('/cart', verifyAccessToken, async (req, res) => {
  try {
    const cart = await Cart.findAll({ include: Product });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/cart', verifyAccessToken, async (req, res) => {
  const { productId } = req.body;
  
  const { user } = res.locals;
  
  const cart = await Cart.findOne({ where: { productId, userId: user.id } });
  

  if (cart) {
    cart.count += 1;
    await cart.save();
  } else {
    await Cart.create({ productId, userId: user.id, count: 1 });
  }
  res.json({ mesage: 'Товар добавлен в корзину' });
});

router.get('/:id', async (req, res) => {
  const { user } = res.locals;
  try {
    const cart = await Cart.findAll({
      include: [{ model: Product }],
      where: { userId: req.params.id },
    });
    

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});


router.delete('/:id', verifyAccessToken, async (req, res) =>{
  const {id} = req.params;
  const { user } = res.locals;
try {
  const product = await Cart.findOne({where: { productId: id, userId: user.id }})
    if (product.userId == user.id) 
        
    
    {
    product.destroy();
    res.sendStatus(200);
  } else{
    res.status(400).json({message: "У вас нет прав на удаление"});
  }
} catch (error) {
  console.error(error);
  res.sendStatus(400);
}
})



module.exports = router;
