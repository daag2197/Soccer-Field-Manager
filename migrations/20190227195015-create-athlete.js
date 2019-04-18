'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Athletes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      User: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      BirthDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Team: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      Captain: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1'
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
    return queryInterface.dropTable('Athletes');
  }
};