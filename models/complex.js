'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complex = sequelize.define('Complex', {
    IdComplex:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ComplexName: DataTypes.STRING,
    Latitude: DataTypes.STRING,
    Longitude: DataTypes.STRING,
    Address: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  Complex.associate = function(models) {
    // associations can be defined here
    Complex.hasMany(models.Field, {foreignKey: 'Complex'});
    Complex.hasMany(models.League, { foreignKey: 'Complex' });
  };
  return Complex;
};