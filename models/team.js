'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    TeamName: DataTypes.STRING,
    League: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
    Team.belongsTo(models.League, { as: 'League Detail',foreignKey: 'League' });
    Team.hasMany(models.Athlete,{foreignKey: 'Team'});
  };
  return Team;
};