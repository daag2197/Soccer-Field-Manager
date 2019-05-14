const Sequelize = require('sequelize');
var models = require('../models/');
var Day = models.Day;
const _ = require('lodash');
const { sendResponse } = require('../services/responseHandler');

exports.test = function (req, res) {
    console.log(req.query);
    res.send('Greetings from the Test controller!');
}
//Save Day
exports.create = function(req,res){
    let days = {
        Days: req.body.Days
    }
    Day.create(days)
      .then(doc => {
        sendResponse(res,'true','200',doc);
      })
      .catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
      });
}
//FIND ALL
exports.findall = function(req,res){
  let message = "";
  Day.findAll({
    attributes: {
      exclude: ['createdAt','updatedAt']
    }
  }).then(day => {
    if(day == ""){
      message =`Not found. Days`
      sendResponse(res, 'false', '404', {}, message);
    }else{
        sendResponse(res, 'true', '200', day);
    }
}).catch(err => {
    message = err.message || 'cannot retrive';
    sendResponse(res, 'false', '400', {},message);
});
}