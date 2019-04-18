'use strict';
module.exports = (sequelize, DataTypes) => {
  const Athlete = sequelize.define('Athlete', {
    User: DataTypes.INTEGER,
    BirthDate: DataTypes.DATE,
    Team: DataTypes.INTEGER,
    Captain: DataTypes.BOOLEAN,
    Status: DataTypes.BOOLEAN
  }, {});
  Athlete.associate = function(models) {
    // associations can be defined here
    Athlete.belongsTo(models.User, {as: 'Id User',foreignKey: "User"});
    Athlete.belongsTo(models.Team,{as: 'Athlete Team',foreignKey: "Team"});
  };
  return Athlete;
};