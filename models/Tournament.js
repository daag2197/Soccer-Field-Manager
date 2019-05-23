'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    Name: DataTypes.STRING,
    IdLeague: DataTypes.INTEGER,
    Season: DataTypes.INTEGER,
    Phase: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here
    Tournament.belongsTo(models.League,{ as:'idLeague', foreignKey: 'IdLeague' });
    Tournament.hasMany(models.TournamentDetails,{ foreignKey: 'Tournament'});
    Tournament.hasMany(models.Season,{ foreignKey: 'Tournament'});
  };
  return Tournament;
};