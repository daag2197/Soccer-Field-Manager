'use strict';
module.exports = (sequelize, DataTypes) => {
  const Athlete = sequelize.define('Athlete', {
    IdAthlete: DataTypes.INTEGER,
    User: DataTypes.INTEGER,
    BirthDate: DataTypes.DATE,
    Team: DataTypes.INTEGER,
    Captain: DataTypes.BOOLEAN,
    Status: DataTypes.BOOLEAN
  }, {});
  Athlete.associate = function(models) {
    // associations can be defined here
  };
  return Athlete;
};