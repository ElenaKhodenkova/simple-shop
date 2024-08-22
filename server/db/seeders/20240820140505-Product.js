'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    
    for (let i = 1; i <= 10; i++) {
      arr.push({
        name: "наименование товара №" + i,
        price: i * 1000,
        description: 'описание товара №' + i,
        image: '/img/' + i + ".webp",
        count: i,
      });
    }
    await queryInterface.bulkInsert('Products', arr);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};

