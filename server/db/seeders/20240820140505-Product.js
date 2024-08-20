'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    const desc = 'наименование товара #';
    for (let i = 1; i <= 10; i++) {
      arr.push({
        name: desc + i,
        price: i * 1000,
        description: 'описание товара ' + desc,
        image: '/img/' + i,
        count: i,
      });
    }
    await queryInterface.bulkInsert('Products', arr);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};

