const Sequelize = require("sequelize");
var models = require("../models/");
var UserType = models.UserType;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

exports.test = function(req, res) {
    console.log(req.query);
    res.send("Greetings from the Test controller!");
};

exports.create = function (req, res) {
    let usertype = {
        Description: req.body.Description
    }
  
    UserType.create(usertype).then(doc => {
      sendResponse(res,'true','200',doc);
    }).catch(err => {
      sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

exports.findAll = function (req,res) {
    UserType.findAll({where: {Status: '1'} }).then(usertype => {
      if(usertype == ""){
        sendResponse(res, 'false', '404', {}, `Not found. usertype`);
      }
      else{
        sendResponse(res, 'true', '200', usertype);
      }
    }).catch(err => {
      const message = err.message || "cannot retrive.";
      sendResponse(res, 'false', '400', {}, message);
    });
};

exports.findOne = function (req,res) {
    let id = req.params.id;
    UserType.findOne({
        attributes: {
            exclude: ['Status']
        },
        where: {
          id,
          Status: '1'
        }
    }).then(usertype => {
      if(!usertype){
        sendResponse(res, 'false', '404', {}, `Not found. User Type`);
      }
      else{
        sendResponse(res, 'true', '200', usertype);
      }
      }).catch(err => {
        const message = err.message || "cannot retrive."
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.update = function(req,res) {
    let id = req.params.id
    UserType.findOne({
        where: {
          id,
          Status: '1'
        }
    }).then(usertype => {
        if(!usertype){
          return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
        }
        return UserType.update({
            Description: req.body.Description
        },
        {
            where: {
              id,
              Status: '1'
            }
        }).then(result => {
          const message = `Update Correct with id ${id}`;
          sendResponse(res, 'true', '200',message);
        }).catch(err => {
          const message = err.message || "Error updating user type with id " + id;
          sendResponse(res, 'false', '400', {}, message);
        });
    }).catch(err => {
      const message = err.message || "Error updating user type with id " + id;
      sendResponse(res, 'false', '400', {}, message);
    });
}

exports.delete = function(req,res){
  let id = req.params.id;
  UserType.findOne({
    where: {
      id,
      Status: '1'
    }
  }).then(usertype => {
    if (!usertype) {
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
    }
    return UserType.update({
      Status: 0
    },
    {
      where: {
        id
      }
    }).then(result => {
      const message = `Remmove with id ${id}`;
      sendResponse(res, 'true', '200',message);
    }).catch(err => {
      const message = err.message || "Error removing user type with id " + id;
      sendResponse(res, 'false', '400', {}, message);
    });
  }).catch(err => {
    const message = err.message || "Error removing user type with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.recovery = function(req,res){
  let id = req.params.id;
  UserType.findOne({
    where: {
      id,
      Status: '0'
    }
  }).then(usertype => {
    if (!usertype) {
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
    }
    return UserType.update({
      Status: '1'
    },
    {
      where: {
        id
      }
    }).then(result => {
      const message = `Recover with id ${id}`;
      sendResponse(res, 'true', '200',message);
    }).catch(err => {
      const message = err.message || "Error recovering team with id " + id
      sendResponse(res, 'false', '400', {}, message);
    });
  }).catch(err => {
    const message = err.message || "Error recovering team with id " + id
    sendResponse(res, 'false', '400', {}, message);
  });
}