'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    IdUserType: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Description: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  UserType.associate = function(models) {
    // associations can be defined here
  };
  return UserType;
};