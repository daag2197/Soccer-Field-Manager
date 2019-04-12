'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Leagues', [{
      LeagueName: 'Lunes League',
      StartDate: '2019-03-11',
      EndDate: '2019-06-13',
      Complex: '1',
      GameDay: '1',
      createdAt: '2019-03-04 04:56:55',
      updatedAt: '2019-03-04 04:56:55'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('leagues', null, {});
  }
};
