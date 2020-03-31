'use strict';
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('../services/JWT');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Name: DataTypes.STRING,
    Surname: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    IdProfile: DataTypes.INTEGER,
    Path: DataTypes.STRING,
    Active: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Profile, {
      as: "profile",
      foreignKey: "IdProfile"
    });
  };

  // Class method
  User.findByCredentials = function findByCredentials(Email, Password) {
    const U = this;
    return U.findOne({
      where: { Email },
    }).then((user) => {
      if (!user) {
        return Promise.reject( {message: 'Verify user'} );
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(Password, user.Password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject( {message: 'wrong user/password'} );
          }
        });
      });
    });
  };

  // Instance Method
  User.prototype.toJS = function toJS() {
    const user = this;
    return _.pick(user, ['id', 'Name', 'Surname',
      'Email', 'IdProfile', 'createdAt']);
  };

  User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const token = jwt.sign({ 
      data: { 
        _id: user.id
      } 
    });
    return token;
  };

  // Hooks
  User.beforeSave((user) => {
    user.Password = user.Password && user.Password != '' ? bcrypt.hashSync(user.Password, 10) : '';
  });


  return User;
};