const Sequelize = require('sequelize');
var models = require('../models/');
var Day = models.Day;
const _ = require('lodash');

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
          res.send(days);
      })
      .catch(err => {
        res.status(400).send({
          message: err.message || "cannot save."
        });
      });
}