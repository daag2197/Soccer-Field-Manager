'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FieldName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Complex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Complexes',
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
    return queryInterface.dropTable('Fields');
  }
};