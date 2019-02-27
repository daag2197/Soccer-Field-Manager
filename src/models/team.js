'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    IdTeam: DataTypes.INTEGER,
    TeamName: DataTypes.STRING,
    League: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};