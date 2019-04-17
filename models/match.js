'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    Field: DataTypes.INTEGER,
    League: DataTypes.INTEGER,
    Local: DataTypes.INTEGER,
    Guest: DataTypes.INTEGER,
    Referee: DataTypes.INTEGER,
    Winner: DataTypes.INTEGER,
    IsDraw: DataTypes.BOOLEAN,
    StartGame: DataTypes.TIME,
    EndGame: DataTypes.TIME
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
  };
  return Match;
};