'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MatchDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdMatch: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Matches',
          key: 'id'
        }
      },
      Event: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'MatchEvents',
          key: 'id'
        }
      },
      Time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      Team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      Player: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
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
    return queryInterface.dropTable('MatchDetails');
  }
};