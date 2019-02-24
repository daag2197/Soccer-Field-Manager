/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dia', {
    IdDia: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Dia: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
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
    tableName: 'dia'
  });
};
