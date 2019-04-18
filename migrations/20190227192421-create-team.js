'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TeamName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      League: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Leagues',
          key: 'id'
        }
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
    return queryInterface.dropTable('Teams');
  }
};