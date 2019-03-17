'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('days', [{
        Days: 'Lunes',
        createdAt: '2019-03-04 04:56:55',
        updatedAt: '2019-03-04 04:56:55'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('days', null, {});
  }
};