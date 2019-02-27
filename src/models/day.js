'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    IdDay: DataTypes.INTEGER,
    Days: DataTypes.STRING
  }, {});
  Day.associate = function(models) {
    // associations can be defined here
  };
  return Day;
};