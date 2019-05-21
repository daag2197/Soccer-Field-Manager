'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    Field: DataTypes.INTEGER,
    Local: DataTypes.INTEGER,
    Guest: DataTypes.INTEGER,
    Referee: DataTypes.INTEGER,
    Winner: DataTypes.INTEGER,
    IsDraw: DataTypes.BOOLEAN,
    GameDay: DataTypes.DATE,
    StartGame: DataTypes.TIME,
    EndGame: DataTypes.TIME,
    Status: DataTypes.BOOLEAN
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
    Match.belongsTo(models.Field, { as: 'IdField',foreignKey: 'Field' });
    Match.belongsTo(models.Team,{ as: 'IdLocal',foreignKey: 'Local' });
    Match.belongsTo(models.Team,{ as: 'IdGuest', foreignKey: 'Guest' });
    Match.belongsTo(models.Team,{ as: 'IdWinner', foreignKey: 'Winner' });
    Match.belongsTo(models.User,{ as: 'IdReferee', foreignKey: 'Referee' });
    Match.hasMany(models.MatchDetail,{ foreignKey: 'IdMatch' });
  };
  return Match;
};