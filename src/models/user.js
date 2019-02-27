'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    IdUser: DataTypes.INTEGER,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    SecondLastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    UserType: DataTypes.INTEGER,
    Path: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};