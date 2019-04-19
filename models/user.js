'use strict';
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('../services/JWT');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    SecondLastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    UserType: DataTypes.INTEGER,
    Path: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserType, {as: "User Type",foreignKey: "UserType"});
    User.hasMany(models.Athlete,{foreignKey: "User"});
    User.hasMany(models.Match,{foreignKey: 'Referee'});
  };

  // Class method
  User.findByCredentials = function findByCredentials(email, password) {
    const U = this;
    return U.findOne({
      where: { email },
    }).then((user) => {
      if (!user) {
        return Promise.reject( {message: 'Verify user'} );
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
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
    return _.pick(user, ['id', 'FirstName', 'LastName', 'SecondLastName',
      'Email', 'UserType', 'createdAt']);
  };

  User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const token = jwt.sign({ data: { _id: user.id } });
    return token;
  };

  // Hooks
  User.beforeSave((user, options) => {
    const saltRounds = 10;
    bcrypt.hash(user.Password, saltRounds, function(err, hash) {
      user.Password = hash;
    });
    
  });


  return User;
};