'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessProfile = sequelize.define('AccessProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    IdProfile: {
      type: DataTypes.INTEGER
    },
    IdHostRoute: {
      type: DataTypes.INTEGER
    }
  }, { timestamps: false });
  AccessProfile.associate = function(models) {
    // associations can be defined here
    AccessProfile.belongsTo(models.Profile, {
      as:"profile",
      foreignKey: "IdProfile"
    });
    AccessProfile.belongsTo(models.HostRoute, {
      as: "host",
      foreignKey: "IdHostRoute"
    });
  };
  return AccessProfile;
};