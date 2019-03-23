const Sequelize = require("sequelize");
var models = require("../models/");
var UserType = models.UserType;
const _ = require("lodash");

exports.test = function(req, res) {
    console.log(req.query);
    res.send("Greetings from the Test controller!");
};

exports.create = function (req, res) {
    let usertype = {
        Description: req.body.Description
    }
  
    UserType.create(usertype).then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot save."
        });
    });
};

exports.findAll = function (req,res) {
    UserType.findAll().then(usertype => {
        res.send({ usertype });
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot retrive."
        });
    });
};

exports.findOne = function (req,res) {
    let IdUserType = req.body.IdUserType;
    UserType.findOne({
        attributes: {
            exclude: ['Status']
        },
        where: {
          IdUserType: IdUserType,
          Status: '1'
        }
    }).then(usertype => {
        res.send({ usertype });
      }).catch(err => {
        res.status(400).send({
          message: err.message || "cannot retrive."
        });
    });
}

exports.update = function(req,res) {
    let IdUserType = req.body.IdUserType
    UserType.findOne({
        where: {
            IdUserType: IdUserType,
            Status: '1'
        }
    }).then(usertype => {
        if(!usertype){
            return res.status(404).send({
                message:`Not Found. user type with id ${IdUserType}`
            });
        }
        return UserType.update({
            Description: req.body.Description
        },
        {
            where: {
                IdUserType: IdUserType,
                Status: '1'
            }
        });
    }).then(result => {
        res.send({
            message: `Update Correct with id ${IdUserType}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error updating user type with id " + IdUserType
        });
    });
}

exports.delete = function(req,res){
  let IdUserType = req.body.IdUserType;
  UserType.findOne({
    where: {
      IdUserType: IdUserType,
      Status: '1'
    }
  }).then(usertype => {
    if (!usertype) {
      return res.status(404).send({
        message: `Not found. User Type with id ${IdUserType}`
      })
    }
    return UserType.update({
      Status: 0
    },
    {
      where: {
        IdUserType: IdUserType
      }
    });
  }).then(result => {
    res.send({
      message: `Remmove with id ${IdUserType}`
    })
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error removing user type with id " + IdUserType
    });
  })
}

exports.recovery = function(req,res){
  let IdUserType = req.body.IdUserType;
  UserType.findOne({
    where: {
      IdUserType: IdUserType,
      Status: '0'
    }
  }).then(usertype => {
    if (!usertype) {
      return res.status(404).send({
        message: `Not found. User Type with id ${IdUserType}`
      })
    }
    return UserType.update({
      Status: '1'
    },
    {
      where: {
        IdUserType: IdUserType
      }
    });
  }).then(result => {
    res.send({
      message: `Recover with id ${IdUserType}`
    })
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error recovering team with id " + IdUserType
    });
  })
}