/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cancha', {
    IdCancha: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NombreCancha: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Unidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'unidad',
        key: 'idunidad'
      }
    },
    createdAt: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    updatetAt: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Estatus: {
      type: "BINARY(1)",
      allowNull: false,
      defaultValue: '0x31'
    }
  }, {
    tableName: 'cancha'
  });
};
