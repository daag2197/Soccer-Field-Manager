'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    Description: DataTypes.STRING,
    Active: DataTypes.BOOLEAN
  }, {});
  Profile.associate = function (models) {
    // associations can be defined here
    Profile.hasMany(models.User,
    {
      foreignKey: "IdProfile"
    });
    
    Profile.hasMany(models.AccessProfile,
    {
      foreignKey: "IdProfile"
    })
  };
  return Profile;
};