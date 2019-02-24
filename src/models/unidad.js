/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unidad', {
    IdUnidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NombreUnidad: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Coordenadas: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    Direccion: {
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
    }
  }, {
    tableName: 'unidad'
  });
};
