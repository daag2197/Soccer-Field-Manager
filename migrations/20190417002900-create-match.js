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
          key: 'IdField'
        }
      },
      League: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Leagues',
          key: 'IdLeague'
        }
      },
      Local: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'IdTeam'
        }
      },
      Guest: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'IdTeam'
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
        allowNull: false,
        type: Sequelize.INTEGER
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