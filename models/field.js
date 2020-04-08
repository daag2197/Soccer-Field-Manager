'use strict';
module.exports = (sequelize,DataTypes) => {
    const Field = sequelize.define('Field', {
        Name: DataTypes.STRING,
        IdClub: DataTypes.INTEGER,
        Active: DataTypes.BOOLEAN
    },{});

    Field.associate = function(models){

        Field.belongsTo(models.Club, {
            as: "club",
            foreignKey: "IdClub"
        });

    }
    return Field;
}