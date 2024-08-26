const router = require('express').Router();
const { Product } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');


// Получение всех товаров
router.get('/', async (req, res) => {
    try {
      const entries = await Product.findAll();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  // Добавление нового товара
  router.post('/', verifyAccessToken, async (req, res) => {
    const { name, price, description, image } = req.body;
    const { user } = res.locals;
    try {
      const product = await Product.create({ name, price, description, image, userId: user.id });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

 
  //Редактирование информации о товаре
  router.put('/products/:id', verifyAccessToken, async(req,res) => {
    const { id } = req.params;
    const { user } = res.locals;
    const { name, price, description, image } = req.body;
    
    try {
      const product = await Product.findOne({ where: { id } });
      if (product) {
        if (user.id === product.userId){
          product.name = name;
          product.price = price;
          product.description = description;
          product.image = image;
          await product.save();
          res.json({ message: 'Информация о товаре обновлена' });
        } else {
          res.status(400).json({ message: 'У вас нет прав на редактирование' });
        }
      } else {
        res.status(404).json({ message: 'Товар не найден' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  
// Удаление товара из магазина
router.delete('/products/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const product = await Product.findOne({ where: { id } });
    if (product) {
      if (user.id === product.userId) {
        await product.destroy();
        res.status(200).json({ message: 'Товар удален' });
      } else {
        res.status(403).json({ message: 'У вас нет прав на удаление' });
      }
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при удалении товара' });
  }
});



  module.exports = router;
