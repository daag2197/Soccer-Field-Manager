'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Complexes', {
      IdComplex: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ComplexName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Latitude: {
        type: Sequelize.STRING,
        defaultValue: 'NULL',
      },
      Longitude: {
        type: Sequelize.STRING,
        defaultValue: 'NULL',
      },
      Address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Status: {
        allowNull: false,
        defaultValue: '1',
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Complexes');
  }
};