'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MatchEvents', [{
      Description: 'Yellow Card',
      createdAt: '2019-03-04 04:56:55',
      updatedAt: '2019-03-04 04:56:55'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('MatchEvents', null, {});
  }
};
