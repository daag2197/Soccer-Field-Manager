const Sequelize = require("sequelize");
const models = require("../models/");
const MatchDetail = models.MatchDetail;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

exports.create = function(req,res){
    let Detail = {
        IdMatch: req.body.IdMatch,
        Event: req.body.Event,
        Time: req.body.Time,
        Team: req.body.Team,
        Player: req.body.Player
    }
    MatchDetail.create(Detail).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
}

//Detalles de los partidos
exports.findAll = function(req,res){

}

//Detalles del Partido
exports.findOne = function(req,res){

}

//Actualizar Detalle del Partido
exports.update = function(req,res){
    var message = ""; 
    let id = req.params.id;
    MatchDetail.findOne({
        where: {
            id,
            Status: 1
        }
    }).then(matchdetail => {
        if(!matchdetail){
            message = `Not found. Match detail with id ${id}`;
            return sendResponse(res, 'false', '404', {},message);
        }
        return MatchDetail.update({
            Event: req.body.Event,
            Time: req.body.Time,
            Team: req.body.Team,
            Player: req.body.Player
        },
        {
            where: {
                id,
                Status: 1
            }
        }).then(result => { 
            message = `Update Correct with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            message = err.message || "Error updating Match with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        message = err.message || "Error updating Match with id " + id;
        sendResponse(res, 'false', '400', {},message);
    });
}

//Borrar detalle del partido
exports.delete = function(req,res){
    var message = ""; 
    let id = req.params.id;
    MatchDetail.findOne({
        where: {
            id,
            Status: 1
        }
    }).then(matchdetail => {
        if(!matchdetail){
            message = `Not found. Match detail with id ${id}`;
            return sendResponse(res, 'false', '404', {},message);
        }
        return MatchDetail.update({
            Status: 0
        },
        {
            where: {
                id,
                Status: 1
            }
        }).then(result => { 
            message = `Remmove Correct with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            message = err.message || "Error removing Match detail with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        message = err.message || "Error removing Match detail with id " + id;
        sendResponse(res, 'false', '400', {},message);
    });
}