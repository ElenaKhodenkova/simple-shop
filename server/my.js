const { User, Product, Cart} = require('./db/models');

async function up() {
  const users = await User.findAll({
    attributes: ['id'],
    include: [
      {
        model: Product,
        through: "Cart"
      },
    ],
  });

  console.log(users);
  console.log('=====================================');

}

up();
