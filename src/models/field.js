'use strict';
module.exports = (sequelize, DataTypes) => {
  const field = sequelize.define('field', {
    IdField: DataTypes.INTEGER,
    FieldName: DataTypes.STRING,
    Complex: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  field.associate = function(models) {
    // associations can be defined here
  };
  return field;
};