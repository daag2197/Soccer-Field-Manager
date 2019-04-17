'use strict';
module.exports = (sequelize, DataTypes) => {
  const MatchDetail = sequelize.define('MatchDetail', {
    IdMatch: DataTypes.INTEGER,
    Event: DataTypes.INTEGER,
    Time: DataTypes.TIME,
    Team: DataTypes.INTEGER,
    Player: DataTypes.INTEGER
  }, {});
  MatchDetail.associate = function(models) {
    // associations can be defined here
  };
  return MatchDetail;
};