const Sequelize = require("sequelize");
const models = require("../models/");
const Match = models.Match;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

exports.create = function(req,res){
    let match = {
        Field: req.body.Field,
        League: req.body.League,
        Local: req.body.Local,
        Guest: req.body.Guest,
        Referee: req.body.Referee,
        Winner: req.body.Winner,
        IsDraw: req.body.IsDraw,
        StartGame: req.body.StartGame,
        EndGame: req.body.EndGame
    }
    Match.create(match).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
}

