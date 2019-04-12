'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      FirstName: 'Diego Alejandro',
      LastName: 'Arevalo',
      SecondLastName: 'Garcia',
      Email: 'diego.arevalo.97@hotmail.com',
      Password: '1234',
      UserType: '1',
      createdAt: '2019-03-04 04:56:55',
      updatedAt: '2019-03-04 04:56:55'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
