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