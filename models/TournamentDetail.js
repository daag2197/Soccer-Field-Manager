'use strict';
module.exports = (sequelize, DataTypes) => {
  const TournamentDetails = sequelize.define('TournamentDetails', {
    Tournament: DataTypes.INTEGER,
    Team: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  TournamentDetails.associate = function(models) {
    // associations can be defined here
    TournamentDetails.belongsTo(models.Tournament,{ as:'idTournament', foreignKey: 'Tournament' });
    TournamentDetails.belongsTo(models.Team,{ as:'idTeam', foreignKey: 'Team' });
  };
  return TournamentDetails;
};