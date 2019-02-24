/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipo', {
    IdEquipo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NombreEquipo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Liga: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'liga',
        key: 'idliga'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Estatus: {
      type: "BINARY(1)",
      allowNull: false,
      defaultValue: '0x31'
    }
  }, {
    tableName: 'equipo'
  });
};
