'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    Tournament: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Season.associate = function(models) {
    // associations can be defined here
    Season.belongsTo(models.Tournament,{ foreignKey: 'Tournament' });
  };
  return Season;
};