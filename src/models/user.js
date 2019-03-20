'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    IdUser: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
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
    User.belongsTo(models.UserType, {as: "User Type",foreignKey: "UserType"});
    
  };
  return User;
};