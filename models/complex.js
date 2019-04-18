'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complex = sequelize.define('Complex', {
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