const router = require('express').Router();
const { User, Cart, Product } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken'); //Middleware, вероятно, проверяет токен доступа пользователя, чтобы убедиться, что только авторизованные пользователи могут взаимодействовать с корзиной.
const { post } = require('./auth.router');


//Получение корзины
router.get('/cart', verifyAccessToken, async (req, res) => { //Обработчик GET-запроса gроверяет токен доступа пользователя.
  try {
    const cart = await Cart.findAll({ include: Product });//Получаем все товары в корзине
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

// Добавление товара в корзину
router.post('/cart', verifyAccessToken, async (req, res) => {
  const { productId } = req.body; //Получает `productId` из тела запроса
  const { user } = res.locals; //Получает данные о пользователе из контекста запроса.
  
  const cart = await Cart.findOne({ where: { productId, userId: user.id } }); //bщет товар в корзине пользователя.
  if (cart) {
    cart.count += 1;// если товар есть, добавляет к нему
    await cart.save();
  } else {
    await Cart.create({ productId, userId: user.id, count: 1 });// если товара нет, создает новую запись в корзине
  }
  res.json({ mesage: 'Товар добавлен в корзину' });
});

// Получение корзины по ID пользователя*
router.get('/:id', async (req, res) => { //Обработчик GET-запроса к `/id`, где `id` - ID пользователя.
  const { user } = res.locals; //Получает данные о пользователе из контекста запроса.
  try {
    const cart = await Cart.findAll({
      include: [{ model: Product }],  //Получает товары из корзины пользователя по его ID.
      where: { userId: req.params.id },
    });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});


//Удаление товара из корзины
// router.delete('/:id', verifyAccessToken, async (req, res) =>{
//   const {id} = req.params;
//   const { user } = res.locals;
// try {
//   const product = await Cart.findOne({where: { productId: id, userId: user.id }})
//     if (product.userId == user.id) 
//     {
//     product.destroy();
//     res.sendStatus(200);
//   } else{
//     res.status(400).json({message: "У вас нет прав на удаление"});
//   }
// } catch (error) {
//   console.error(error);
//   res.sendStatus(400);
// }
// })

//Удаление товара из корзины
router.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params; //Получает `id` товара из параметров запроса.
  const { user } = res.locals; //Получает данные о пользователе из контекста запроса.

  try {
    const product = await Cart.findOne({ where: { productId: id, userId: user.id } }); //Ищет товар в корзине пользователя.
    if (product) {
      if (product.count > 1) {
        product.count -= 1;
        await product.save();
      } else {
        await product.destroy();
      }
      res.sendStatus(200);
    } else {
      res.status(400).json({ message: 'У вас нет прав на удаление' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

//Редактирование информации о товаре
// router.put('/products/:id', verifyAccessToken, async (req, res) => {
//   const { id } = req.params;
//   const { user } = res.locals;
//   const { name, price, description, image } = req.body;

//   try {
//     const product = await Product.findOne({ where: { id } });
//     if (product) {
//       if (user.id === product.userId) {
//         product.name = name;
//         product.price = price;
//         product.description = description;
//         product.image = image;
//         await product.save();
//         res.json({ message: 'Информация о товаре обновлена' });
//       } else {
//         res.status(400).json({ message: 'У вас нет прав на редактирование' });
//       }
//     } else {
//       res.status(404).json({ message: 'Товар не найден' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(400);
//   }
// });

module.exports = router;
