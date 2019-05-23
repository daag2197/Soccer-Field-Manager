'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    Tournament: DataTypes.INTEGER,
    SeasonName: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  Season.associate = function(models) {
    // associations can be defined here
    Season.belongsTo(models.Tournament,{ as: 'IdTournament', foreignKey: 'Tournament' });
    Season.hasMany(models.Match,{ foreignKey: 'Season'});
  };
  return Season;
};