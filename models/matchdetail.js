'use strict';
module.exports = (sequelize, DataTypes) => {
  const MatchDetail = sequelize.define('MatchDetail', {
    IdMatch: DataTypes.INTEGER,
    Event: DataTypes.INTEGER,
    Time: DataTypes.TIME,
    Team: DataTypes.INTEGER,
    Player: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  MatchDetail.associate = function(models) {
    // associations can be defined here
    MatchDetail.belongsTo(models.Match,{foreignKey: 'IdMatch'});
    MatchDetail.belongsTo(models.Team,{ as: 'IdTeam',foreignKey: 'Team'});
    MatchDetail.belongsTo(models.MatchEvent,{foreignKey: 'Event'});
    MatchDetail.belongsTo(models.User,{foreignKey: 'Player'});
    
  };
  return MatchDetail;
};