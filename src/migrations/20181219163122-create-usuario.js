'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      IdUsuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ApellidoPaterno: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ApellidoMaterno: {
        type: Sequelize.STRING
      },
      Correo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ClaveAcceso: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('usuarios');
  }
};