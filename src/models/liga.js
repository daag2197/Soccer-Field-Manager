/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('liga', {
    IdLiga: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NombreLiga: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    FechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    FechaFin: {
      type: DataTypes.DATEONLY,
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
    DiaJuego: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'dia',
        key: 'iddia'
      }
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
    tableName: 'liga'
  });
};
