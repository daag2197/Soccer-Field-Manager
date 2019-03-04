'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('complexes',[{
        ComplexName: 'Unidad Lopez Mateos',
        Latitude: '20.64636',
        Longitude: '-103.368589',
        Address: 'Avenida Cristobal Colón, López de Legazpi, 44930 Guadalajara, JAL, México',
        createdAt: '2019-03-04 04:56:55',
        updatedAt: '2019-03-04 04:56:55'
    }],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('complexes', null, {}); 
  }
};
