'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deportistas', {
      IdDeportista: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        references:{
          model: 'usuarios',
          key: 'IdUsuario'
        }
      },
      FechaNacimiento: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Equipo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'equipos',
          key: 'IdEquipo'
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
    return queryInterface.dropTable('deportistas');
  }
};