'use strict';
module.exports = (sequelize, DataTypes) => {
  const league = sequelize.define('league', {
    IdLeague: DataTypes.INTEGER,
    LeagueName: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    Complex: DataTypes.INTEGER,
    GameDay: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  league.associate = function(models) {
    // associations can be defined here
  };
  return league;
};