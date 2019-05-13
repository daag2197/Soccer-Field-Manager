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

//Detalle del partidos
exports.findAll = function(req,res){
    var message = "";
    MatchDetail.findAll({
       include:[
        {
            model: models.Team,
            as: 'IdTeam',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            } 
        },
        {
            model: models.User,
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','Password','Email','UserType']
            }
        },
        {
            model: models.MatchEvent,
            attributes:{
                exclude: ['createdAt', 'updatedAt','Active']
            } 
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt','Status','Team','Event','Player']
        },
        where:{
            Status: 1
        }
    }).then(matchdetail => {
        if(matchdetail == ""){
            message = `Not found. Match detail`
            sendResponse(res, 'false', '404', {},message);
        }else{
            sendResponse(res, 'true', '200', matchdetail);
        }
    }).catch(err => {
        message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

//Detalles del Partido
exports.findOne = function(req,res){
    var message = "";
    let IdMatch = req.params.id
    MatchDetail.findAll({
       include:[
        {
            model: models.Team,
            as: 'IdTeam',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            } 
        },
        {
            model: models.User,
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','Password','Email','UserType']
            }
        },
        {
            model: models.MatchEvent,
            attributes:{
                exclude: ['createdAt', 'updatedAt','Active']
            } 
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt','Status','Team','Event','Player']
        },
        where:{
            IdMatch: IdMatch,
            Status: 1
        }
    }).then(matchdetail => {
        if(matchdetail == ""){
            message = `Not found. Match detail`
            sendResponse(res, 'false', '404', {},message);
        }else{
            sendResponse(res, 'true', '200', matchdetail);
        }
    }).catch(err => {
        message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

//Detalles del Partido por Id detalle
exports.findOneById = function(req,res){
    var message = "";
    let id = req.params.id
    MatchDetail.findAll({
       include:[
        {
            model: models.Team,
            as: 'IdTeam',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            } 
        },
        {
            model: models.User,
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','Password','Email','UserType']
            }
        },
        {
            model: models.MatchEvent,
            attributes:{
                exclude: ['createdAt', 'updatedAt','Active']
            } 
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt','Status','Team','Event','Player']
        },
        where:{
            id: id,
            Status: 1
        }
    }).then(matchdetail => {
        if(matchdetail == ""){
            message = `Not found. Match detail`
            sendResponse(res, 'false', '404', {},message);
        }else{
            sendResponse(res, 'true', '200', matchdetail);
        }
    }).catch(err => {
        message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
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