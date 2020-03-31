'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Surname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        unique: 'uniqueMail',
        type: Sequelize.STRING
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      IdProfile: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key: 'id'
        }
      },
      Path: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Active: {
        allowNull: false,
        defaultValue: true,
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
    return queryInterface.dropTable('Users');
  }
};
