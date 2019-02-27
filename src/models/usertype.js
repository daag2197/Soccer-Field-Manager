'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    IdUserType: DataTypes.INTEGER,
    Description: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  UserType.associate = function(models) {
    // associations can be defined here
  };
  return UserType;
};