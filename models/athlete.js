'use strict';
module.exports = (sequelize,DataTypes) => {
    const Athlete = sequelize.define('Athlete',{
        IdUser: DataTypes.INTEGER,
        Birthday: DataTypes.DATEONLY,
        IdTeam: DataTypes.INTEGER,
        Captain: DataTypes.BOOLEAN,
        Active: DataTypes.BOOLEAN
    },{});

    Athlete.associate = function(models){
         //Asociación con la tablas

         Athlete.belongsTo(models.Team, {
             as: "team",
             foreignKey: "IdTeam"
         });

         Athlete.belongsTo(models.User, {
             as: "user",
             foreignKey: "IdUser"
         });
    }

    return Athlete;
};