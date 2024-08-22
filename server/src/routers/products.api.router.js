const router = require('express').Router();
const { Product } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');

router.get('/', async (req, res) => {
  try {
    const entries = await Product.findAll();
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/:id', async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      product.count += 1;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});


module.exports = router;
