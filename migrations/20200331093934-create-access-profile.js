'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AccessProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdProfile: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key: 'id'
        }
      },
      IdHostRoute: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'HostRoutes',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AccessProfiles');
  }
};