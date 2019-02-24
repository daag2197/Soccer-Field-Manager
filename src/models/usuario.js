/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    IdUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ApellidoPaterno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ApellidoMaterno: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Correo: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true
    },
    Clave: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    TipoUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tipousuario',
        key: 'idtipousuario'
      }
    },
    Path: {
      type: DataTypes.STRING(100),
      allowNull: true
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
    tableName: 'usuario'
  });
};
