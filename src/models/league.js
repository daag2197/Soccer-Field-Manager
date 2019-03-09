'use strict';
module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define("League",{
      IdLeague: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      LeagueName: DataTypes.STRING,
      StartDate: DataTypes.DATE,
      EndDate: DataTypes.DATE,
      Complex: DataTypes.INTEGER,
      GameDay: DataTypes.INTEGER,
      Status: DataTypes.BOOLEAN
    },
    {}
  );
  League.associate = function(models) {
    // associations can be defined here
    League.belongsTo(models.Complex, { as: 'Complex Detail',foreignKey: 'Complex' });
    League.belongsTo(models.Day,{foreignKey: 'GameDay'});
  };
  return League;
};