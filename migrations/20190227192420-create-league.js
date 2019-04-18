'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Leagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LeagueName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      StartDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      EndDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Complex: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Complexes',
          key: 'id'
        }
      },
      GameDay: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Days',
          key: 'id'
        }
      },
      Status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: '1'
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
    return queryInterface.dropTable('Leagues');
  }
};