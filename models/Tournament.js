'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    League: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here
    Tournament.belongsTo(models.League,{ foreignKey: 'League' });
  };
  return Tournament;
};