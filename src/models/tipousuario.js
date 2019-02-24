/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipousuario', {
    IdTipoUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
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
    tableName: 'tipousuario'
  });
};
