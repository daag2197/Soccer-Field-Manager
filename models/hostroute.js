'use strict';
module.exports = (sequelize, DataTypes) => {
  const HostRoute = sequelize.define('HostRoute', {
    Name: DataTypes.STRING,
    OriginalUrl: DataTypes.STRING,
    Method: DataTypes.STRING,
    Host: DataTypes.STRING,
    Active: DataTypes.BOOLEAN
  }, {});
  HostRoute.associate = function(models) {
    // associations can be defined here
    HostRoute.hasMany(models.AccessProfile, {
      foreignKey: "IdHostRoute"
    })
  };
  return HostRoute;
};