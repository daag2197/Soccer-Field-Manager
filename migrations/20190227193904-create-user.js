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
      FirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SecondLastName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        unique: 'uniqueMail',
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      UserType: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserTypes',
          key: 'id'
        }
      },
      Path: {
        allowNull: true,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};
