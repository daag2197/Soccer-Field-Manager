'use strict';
module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    IdLeague: DataTypes.INTEGER,
    LeagueName: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    Complex: DataTypes.INTEGER,
    GameDay: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  League.associate = function(models) {
    // associations can be defined here
  };
  return League;
};