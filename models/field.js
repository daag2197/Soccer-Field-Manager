'use strict';
module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    FieldName: DataTypes.STRING,
    Complex: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN
  }, {});
  Field.associate = function(models) {
    // associations can be defined here
    Field.belongsTo(models.Complex, { as: 'Complex Detail',foreignKey: 'Complex' });
  };
  return Field;
};