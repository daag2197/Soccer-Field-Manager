'use strict';
module.exports = (sequelize,DataTypes) => {
    const Club = sequelize.define('Club',{
        Name: DataTypes.STRING,
        Latitude: DataTypes.STRING,
        Longitude: DataTypes.STRING,
        Address: DataTypes.STRING,
        Suburb: DataTypes.STRING,
        Active: DataTypes.BOOLEAN,
    },{});

    Club.associate = function (models){
        //Asociación con la tablas
        
        Club.hasMany(models.Field, {
            foreignKey: "IdClub"
        });

        Club.hasMany(models.League,{
            foreignKey: "IdClub"
        })
    }
    return Club;
};