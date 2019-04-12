'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    IdDay: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Days: DataTypes.STRING
  }, {});
  Day.associate = function(models) {
    // associations can be defined here
    Day.hasMany(models.League, { foreignKey: "GameDay" });
  };
  return Day;
};