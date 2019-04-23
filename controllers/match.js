const Sequelize = require("sequelize");
const models = require("../models/");
const Match = models.Match;
const MatchDetail = models.MatchDetail;
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

exports.findAll =  function(req,res){
    var message = "";
    Match.findAll({
        include:[
        {
            model: models.Field,
            as: 'IdField',
            attributes: {
                exclude:['createdAt','updatedAt','Status','Complex']
            },
            include:[{
                model: models.Complex,
                as: 'Complex Detail',
                attributes: {
                exclude: ['createdAt','updatedAt','Latitude','Longitude','Status']
                }
            }],
        },
        {
            model: models.League,
            as:  'IdLeague',
            attributes: {
                exclude:['createdAt','updatedAt','Complex','GameDay','Status']
            },
            include:[{
                model: models.Day,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        },
        {
            model: models.Team,
            as: 'IdLocal',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            }
        },
        {
            model: models.Team,
            as: 'IdGuest',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            }
        },
        {
            model: models.User,
            as: 'IdReferee',
            attributes: {
                exclude: ['createdAt','updatedAt','Status','UserType','Password']
            },
            include:[{
                model: models.UserType,
                as: "User Type",
                attributes: {
                    exclude: ['createdAt', 'updatedAt','Status',]
                }
            }]
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt','Field','League','Local','Guest','Referee']
        },
        where: {
            Status: 1
        }
    }).then(match => {
        if(match == ""){
            message = `Not found. Match`
            sendResponse(res, 'false', '404', {},message);
        }else{
            sendResponse(res, 'true', '200', match);
        }
    }).catch(err => {
        message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.findOne = function(req,res){
    var message = "";
    const id = req.params.id;
    Match.findOne({
        include:[
        {
            model: models.Field,
            as: 'IdField',
            attributes: {
                exclude:['createdAt','updatedAt','Status','Complex']
            },
            include:[{
                model: models.Complex,
                as: 'Complex Detail',
                attributes: {
                exclude: ['createdAt','updatedAt','Latitude','Longitude','Status']
                }
            }],
        },
        {
            model: models.League,
            as:  'IdLeague',
            attributes: {
                exclude:['createdAt','updatedAt','Complex','GameDay','Status']
            },
            include:[{
                model: models.Day,
                attributes: {
                exclude: ['createdAt', 'updatedAt']
                }
            }]
        },
        {
            model: models.Team,
            as: 'IdLocal',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            }
        },
        {
            model: models.Team,
            as: 'IdGuest',
            attributes:{
                exclude: ['createdAt', 'updatedAt','Status','League']
            }
        },
        {
            model: models.User,
            as: 'IdReferee',
            attributes: {
                exclude: ['createdAt','updatedAt','Status','UserType','Password']
            },
            include:[{
                model: models.UserType,
                as: "User Type",
                attributes: {
                    exclude: ['createdAt', 'updatedAt','Status']
                }
            }]
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt','Field','League','Local','Guest','Referee']
        },
        where:{
            id,
            Status: 1
        }
    }).then(match => {
        if(!match){
            message = `Not found. Match`
            sendResponse(res, 'false', '404', {},message);
        }else{
            sendResponse(res, 'true', '200', match);
        }
    }).catch(err => {
        message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.update = function(req,res){
    var message = ""; 
    let id = req.params.id;
    Match.findOne({
        where: {
            id,
            Status: 1
        }
    }).then(match => {
        if(!match){
            message = `Not found. Match with id ${id}`;
            return sendResponse(res, 'false', '404', {},message);
        }
        return Match.update({
            Field: req.body.Field,
            League: req.body.League,
            Local: req.body.Local,
            Guest: req.body.Guest,
            Referee: req.body.Referee,
            Winner: req.body.Winner,
            IsDraw: req.body.IsDraw,
            StartGame: req.body.StartGame,
            EndGame: req.body.EndGame
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

exports.delete = function(req,res){
    var message = ""; 
    let id = req.params.id;
    Match.findOne({
        where: {
            id,
            Status: 1
        }
    }).then(match => {
        if(!match){
            message = `Not found. Match with id ${id}`;
            return sendResponse(res, 'false', '404', {},message);
        }
        return Match.update({
            Status: 0
        },
        {
            where: {
                id,
                Status: 1
            }
        }).then(result => { 
            return MatchDetail.update({
                Status: 0
            },
            {
                where:{
                    IdMatch: id,
                    Status: 1
                }
            }).then(result => {
                message = `Remmove Correct with id ${id}`
                sendResponse(res, 'true', '200', message);
            }).catch(err => {
                message = err.message || "Error removing Match with id " + id;
                sendResponse(res, 'false', '400', {},message);
            });
        }).catch(err => {
            message = err.message || "Error removing Match with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        message = err.message || "Error removing Match with id " + id;
        sendResponse(res, 'false', '400', {},message);
    });
}

