'use strict';
module.exports = (sequelize, DataTypes) => {
  const MatchEvent = sequelize.define('MatchEvent', {
    Description: DataTypes.STRING,
    Active: DataTypes.BOOLEAN
  }, {});
  MatchEvent.associate = function(models) {
    // associations can be defined here
    MatchEvent.hasMany(models.MatchDetail,{foreignKey: 'Event'});
  };
  return MatchEvent;
};