'use strict';
module.exports = (sequelize,DataTypes) => {
    const League = sequelize.define('League',{
        Name: DataTypes.STRING,
        IdClub: DataTypes.INTEGER, 
        GameDay: DataTypes.INTEGER, 
        Active: DataTypes.BOOLEAN
    },{});

    League.associate = function(models){
        //Asociación con la tablas

        League.belongsTo(models.Day,{
            foreignKey: "GameDay"
        });

        League.belongsTo(models.Club, {
            as: "club",
            foreignKey: "IdClub"
        });

        // League.hasMany(models.Team,{
        //     foreignKey: "IdLeague"
        // });
    }
    return League;
}