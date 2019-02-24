/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deportista', {
    IdDeportista: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true
    },
    Usuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'idusuario'
      }
    },
    FechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Equipo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'equipo',
        key: 'idequipo'
      }
    },
    Capitan: {
      type: "BINARY(1)",
      allowNull: false,
      defaultValue: '0x30'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Estatus: {
      type: "BINARY(1)",
      allowNull: false,
      defaultValue: '0x31'
    }
  }, {
    tableName: 'deportista'
  });
};
