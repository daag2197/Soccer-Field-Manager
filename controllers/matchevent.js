const Sequelize = require("sequelize");
const models = require("../models/");
const MatchEvent = models.MatchEvent;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

exports.create = function(req,res){
    let Event = {
        Description: req.body.Description
    }
    MatchEvent.create(Event).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
}
exports.findall = function(req,res){
    MatchEvent.findAll({ where: {Active: '1'} }).then(matchevent =>{
        if(matchevent == ""){
            sendResponse(res, 'false', '404', {}, `Not found. Match Events`);
        }else{
            sendResponse(res, 'true', '200', matchevent);
        }
    }).catch(err => {
        const message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {}, message);
    });
}
exports.findone = function(req,res){
    let IdMatchEvent = req.body.IdMatchEvent
    MatchEvent.findOne({
        where: {
            Active: '1',
            id: IdMatchEvent
        }
    }).then(matchevent =>{
        if(!matchevent){
            sendResponse(res, 'false', '404', {}, `Not found. Match Event`);
        }else{
            sendResponse(res, 'true', '200', matchevent);
        }
    }).catch(err => {
        const message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}
exports.update = function(req,res){
    //var MatchEventOrig = "";
    let IdMatchEvent = req.body.IdMatchEvent;
    MatchEvent.findOne({
        where: {
            id: IdMatchEvent,
            Active: '1'
        }
    }).then(matchevent => {
        if(!matchevent){
            return sendResponse(res, 'false', '404', {}, `Not found. Match event with id ${IdMatchEvent}`);
        }
        //MatchEventOrig = matchevent.Description
        return MatchEvent.update({
            Description: req.body.Description
        },
        {
            where: {
                id: IdMatchEvent,
                Active: '1'
            }
        });
    }).then(result => { 
       sendResponse(res, 'true', '200', `Update Correct with id ${IdMatchEvent}`);
    }).catch(err => {
        const message = err.message || "Error updating Match event with id " + IdMatchEvent;
        sendResponse(res, 'false', '500', {},message);
    });
}
exports.delete = function(req,res){
    let IdMatchEvent = req.body.IdMatchEvent;
    MatchEvent.findOne({
        where: {
            id: IdMatchEvent,
            Active: '1'
        }
    }).then(matchevent => {
        if(!matchevent){
            return sendResponse(res, 'false', '404', {}, `Not found. Match event with id ${IdMatchEvent}`);
        }
        return MatchEvent.update({
            Active: '0'
        },
        {
            where: {
                id: IdMatchEvent,
                Active: '1'
            }
        });
    }).then(result => { 
       sendResponse(res, 'true', '200', `Remmove with id ${IdMatchEvent}`);
    }).catch(err => {
        const message = err.message || "Error removing Match event with id " + IdMatchEvent;
        sendResponse(res, 'false', '500', {}, message);
    });
}
exports.recovery = function(req,res){
    let IdMatchEvent = req.body.IdMatchEvent;
    MatchEvent.findOne({
        where: {
            id: IdMatchEvent,
            Active: '0'
        }
    }).then(matchevent => {
        if(!matchevent){
           return sendResponse(res, 'false', '404', {}, `Not found. Match event with id ${IdMatchEvent}`);
        }
        return MatchEvent.update({
            Active: '1'
        },
        {
            where: {
                id: IdMatchEvent,
                Active: '0'
            }
        });
    }).then(result => { 
       sendResponse(res, 'true', '200', `Recover with id ${IdMatchEvent}`);
    }).catch(err => {
        const message = err.message || "Error recovering Match event with id " + IdMatchEvent;
        sendResponse(res, 'false', '500', {}, message);
    });
}