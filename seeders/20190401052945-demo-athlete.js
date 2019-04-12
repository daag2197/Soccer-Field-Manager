'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Athletes', [{
      IdAthlete: '1',
      User: '1',
      BirthDate: '1997-09-21',
      Team: '1',
      createdAt: '2019-03-04 04:56:55',
      updatedAt: '2019-03-04 04:56:55'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Athletes', null, {});
  }
};
