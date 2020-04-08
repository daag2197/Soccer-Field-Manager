'use strict';
module.exports = (sequelize,DataTypes) => {
    const Team = sequelize.define('Team',{
        Name: DataTypes.STRING,
        IdLeague: DataTypes.STRING,
        Active: DataTypes.BOOLEAN
    },{});
    Team.associate = function (models){
        //Asociación con la tablas

        Team.belongsTo(models.League,{
            as: "league",
            foreignKey: "IdLeague"
        });

        Team.hasMany(models.Athlete,{
            foreignKey: "IdTeam"
        });
    }
    return Team;
};
