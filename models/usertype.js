'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    Description: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  UserType.associate = function(models) {
    // associations can be defined here
    UserType.hasMany(models.User, { foreignKey: "UserType" });
  };
  return UserType;
};