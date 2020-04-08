'use strict';
module.exports = (sequelize,DataTypes) => {
    const Language = sequelize.define('Language',{
        CodeLanguage: DataTypes.STRING,
        Name: DataTypes.STRING,
        Active: DataTypes.BOOLEAN
    },{});

    Language.associate = function (models){
        //Asociación con la tablas

        Language.hasMany(models.Day, {
            foreignKey: "IdLanguage"
        });
        
    }
    return Language;
};