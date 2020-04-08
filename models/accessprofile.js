'use strict';
const model = require("../models/");
const Host = model.HostRoute;

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

  AccessProfile.ValidateAdmin = function ValidateAdmin(IdProfile, IdHostRoute) {
    //Constantes
    const Access = this;

    Access.findOne({
      where: {
        IdProfile: IdProfile,
        IdHostRoute: IdHostRoute
      }
    }).then(Val => {
      if (Val) {
        return Val;
      } else {
        return false;
      }
    }).catch(err => {
      console.log("Error")
      return false;
    });
  }
  return AccessProfile;
};
