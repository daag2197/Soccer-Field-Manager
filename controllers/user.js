const Sequelize = require("sequelize");
const models = require("../models/");
const User = models.User;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

exports.test = function (req, res) {
    console.log(req.query);
    res.send("Greetings from the Test controller!");
};

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
    res.send({ user });
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "cannot retrive."
    });
  });
};

exports.findOne = function(req,res){
  const id = req.body.id;
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
      id,
      Status: '1'
    }
  })
  .then(user => {
    res.send({ user });
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "cannot retrive."
    });
  });
}

exports.update = function(req,res){
  let IdUser = req.body.IdUser;
  User.findOne({
    where: {
      IdUser: IdUser,
      Status: 1
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({
        message: `Not Found. user with id ${IdUser}`
      });
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
          IdUser: IdUser,
          Status: '1'
        }
      });
  }).then(result => {
    res.send({
      message: `Update Correct with id ${IdUser}`
    });
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error updating user with id " + IdUser
    });
  });
}

exports.delete = function(req,res){
  let IdUser = req.body.IdUser;
  User.findOne({
    where: {
      IdUser: IdUser,
      Status: '1'
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({
        message: `Not Found. user with id ${IdUser}`
      });
    }
    return User.update({
      Status : '0'
    },
      {
        where: {
          IdUser: IdUser
        }
      });
  }).then(result => {
    res.send({
      message: `Remmove with id ${IdUser}`
    });
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error removing user type with id " + IdUser
    });
  });
}

exports.recovery = function(req,res){
  let IdUser = req.body.IdUser;
  User.findOne({
    where: {
      IdUser: IdUser,
      Status: '0'
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({
        message: `Not Found. user with id ${IdUser}`
      });
    }
    return User.update({
      Status : '1'
    },
      {
        where: {
          IdUser: IdUser
        }
      });
  }).then(result => {
    res.send({
      message: `Recover with id ${IdUser}`
    });
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error recovering user type with id " + IdUser
    });
  });
}

