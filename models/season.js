'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    Tournament: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Season.associate = function(models) {
    // associations can be defined here
    // Season.belongsTo(models.tournament,{ foreignKey: 'Tournament' });
    Season.hasMany(models.Match,{ foreignKey: 'Season'});
  };
  return Season;
};