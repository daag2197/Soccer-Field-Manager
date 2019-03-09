const Sequelize = require("sequelize");
var models = require("../models/");
var Team = models.Team;
const _ = require("lodash");

exports.test = function(req, res) {
  console.log(req.query);
  res.send("Greetings from the Test controller!");
};
