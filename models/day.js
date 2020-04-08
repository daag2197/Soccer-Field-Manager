'use strict';
module.exports = (sequelize,DataTypes) => {
    const Day = sequelize.define('Day',{
        Day: DataTypes.STRING,
        IdLanguage: DataTypes.INTEGER,
        Active: DataTypes.BOOLEAN
    },{});
    Day.associate = function(models){
        //Asociación con la tablas

        Day.belongsTo(models.Language,{
            as: "lenguage",
            foreignKey: "IdLanguage" 
        });
        
        Day.hasMany(models.League,{
            foreignKey: "GameDay"
        });
        
    }
    return Day;
};
