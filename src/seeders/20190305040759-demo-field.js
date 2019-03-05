'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('fields', [{
        FieldName: 'Cancha 1',
        Complex: '1'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('fields', null, {});
  }
};
