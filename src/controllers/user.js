const Sequelize = require("sequelize");
var models = require("../models/");
var User = models.User;
const _ = require("lodash");

exports.test = function (req, res) {
    console.log(req.query);
    res.send("Greetings from the Test controller!");
};

//Crear *Falta encriptar la contraseña
exports.create = function (req, res) {
    let user = {
        FirstName: req.body.FirstName,
        LastName:req.body.LastName,
        SecondLastName:req.body.SecondLastName,
        Email:req.body.Email,
        Password:req.body.Password,
        UserType:req.body.UserType,
        Path:req.body.Path
    }
    User.create(user).then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot save."
        });
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
  let IdUser = req.body.IdUser;
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
      IdUser: IdUser,
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
