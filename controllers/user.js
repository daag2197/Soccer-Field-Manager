const Sequelize = require("sequelize");
const models = require("../models/");
const User = models.User;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');


exports.create = function (req, res) {
  const body = req.body;
  const user = User.build(body);
  user.save()
    .then((u) => user.generateAuthToken())
    .then((token) => {
      const objRes = {
        user: user.toJS(),
        token,
      };
      sendResponse(res, 'true', '200', objRes);
    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

exports.findAll = function (req, res) {
  User.findAll({
    attributes: {
      exclude: ["Status", "Password", "UserType"]
    },
    include: [{
      model: models.UserType,
      as: "User Type",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Status"]
      }
    }],
    where: {
      Status: '1'
    }
  })
  .then(user => {
    if(user == ""){
      sendResponse(res, 'false', '404', {}, `Not found. Users`);
    }
    else{
      sendResponse(res, 'true', '200', user);
    }
  })
  .catch(err => {
    const message = err.message || "cannot retrive."
    sendResponse(res, 'false', '400', {}, message);
  });
};

exports.findOne = function(req,res){
  const id = req.params.id;
  User.findOne({
    attributes: {
      exclude: ["Status", "Password", "UserType"]
    },
    include: [{
      model: models.UserType,
      as: "User Type",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Status"]
      }
    }],
    where: {
      id: id,
      Status: '1'
    }
  })
  .then(user => {
    if(!user){
      sendResponse(res, 'false', '404', {}, `Not found. User`);
    }
    else{
      sendResponse(res, 'true', '200', user);
    }
  })
  .catch(err => {
    const message = err.message || "cannot retrive."
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.update = function(req,res){
  const id = req.params.id;
  User.findOne({
    where: {
      id,
      Status: 1
    }
  }).then(user => {
    if (!user) {
      return sendResponse(res, 'false', '404', {}, `Not Found. user with id ${id}`);
    }
    return User.update({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      SecondLastName: req.body.SecondLastName,
      Email: req.body.Email,
      Password: req.body.Password,
      UserType: req.body.UserType,
      Path: req.body.Path
    },
      {
        where: {
          id,
          Status: '1'
        }
      }).then(result => {
        const message =  `Update Correct with id ${result}`
        sendResponse(res, 'true', '200',message);
      }).catch(err => {
        const message = err.message || "Error updating user with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error updating user with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.delete = function(req,res){
  let id = req.params.id;
  User.findOne({
    where: {
      id,
      Status: '1'
    }
  }).then(user => {
    if (!user) {
      return sendResponse(res, 'false', '404', {}, `Not Found. user with id ${id}`);
    }
    return User.update({
      Status : '0'
    },
      {
        where: {
          id
        }
      }).then(result => {
        const message = `Remmove with id ${result}`
        sendResponse(res, 'true', '200', message);
      }).catch(err => {
        const message = err.message || "Error removing user with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error removing user with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.recovery = function(req,res){
  let id = req.params.id;
  User.findOne({
    where: {
      id,
      Status: '0'
    }
  }).then(user => {
    if (!user) {
     return sendResponse(res, 'false', '404', {}, `Not Found. user with id ${id}`);
    }
    return User.update({
      Status : '1'
    },
      {
        where: {
          id
        }
      }).then(result => {
        message = `Recover with id ${result}`;
        sendResponse(res, 'true', '200', message);
      }).catch(err => {
        const message = err.message || "Error recovering user with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error recovering user with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

