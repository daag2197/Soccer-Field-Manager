'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Field: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Fields',
          key: 'id'
        }
      },
      League: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Leagues',
          key: 'id'
        }
      },
      Local: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      Guest: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      Referee: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      Winner: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      IsDraw: {
        allowNull: false,
        defaultValue: '1',
        type: Sequelize.BOOLEAN
      },
      StartGame: {
        allowNull: false,
        type: Sequelize.TIME
      },
      EndGame: {
        allowNull: false,
        type: Sequelize.TIME
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
    return queryInterface.dropTable('Matches');
  }
};