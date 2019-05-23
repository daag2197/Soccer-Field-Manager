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
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Fields',
          key: 'id'
        }
      },
      Season: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Seasons',
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
        allowNull: true,
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
        defaultValue: '0',
        type: Sequelize.BOOLEAN
      },
      GameDay: {
        allowNull: true,
        type: Sequelize.DATE
      },
      StartGame: {
        allowNull: true,
        type: Sequelize.TIME
      },
      EndGame: {
        allowNull: true,
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