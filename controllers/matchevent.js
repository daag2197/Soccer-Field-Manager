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
    let id = req.params.id
    MatchEvent.findOne({
        where: {
            Active: '1',
            id
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
    let id = req.params.id;
    MatchEvent.findOne({
        where: {
            id,
            Active: '1'
        }
    }).then(matchevent => {
        if(!matchevent){
            return sendResponse(res, 'false', '404', {}, `Not found. Match event with id ${id}`);
        }
        //MatchEventOrig = matchevent.Description
        return MatchEvent.update({
            Description: req.body.Description
        },
        {
            where: {
                id,
                Active: '1'
            }
        }).then(result => { 
            const message = `Update Correct with id ${id}`
           sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error updating Match event with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        const message = err.message || "Error updating Match event with id " + id;
        sendResponse(res, 'false', '400', {},message);
    });
}
exports.delete = function(req,res){
    let id = req.params.id;
    MatchEvent.findOne({
        where: {
            id,
            Active: '1'
        }
    }).then(matchevent => {
        if(!matchevent){
            return sendResponse(res, 'false', '404', {}, `Not found. Match event with id ${id}`);
        }
        return MatchEvent.update({
            Active: '0'
        },
        {
            where: {
                id,
                Active: '1'
            }
        }).then(result => { 
            const message = `Remmove with id ${id}`
           sendResponse(res, 'true', '200',message);
        }).catch(err => {
            const message = err.message || "Error removing Match event with id " + id;
            sendResponse(res, 'false', '400', {}, message);
        });
    }).catch(err => {
        const message = err.message || "Error removing Match event with id " + id;
        sendResponse(res, 'false', '400', {}, message);
    });
}
exports.recovery = function(req,res){
    let id = req.params.id;
    MatchEvent.findOne({
        where: {
            id,
            Active: '0'
        }
    }).then(matchevent => {
        if(!matchevent){
           return sendResponse(res, 'false', '404', {}, `Not found. Match event with id ${id}`);
        }
        return MatchEvent.update({
            Active: '1'
        },
        {
            where: {
                id,
                Active: '0'
            }
        }).then(result => { 
            const message = `Recover with id ${id}`
            sendResponse(res, 'true', '200', message);
         }).catch(err => {
             const message = err.message || "Error recovering Match event with id " + id;
             sendResponse(res, 'false', '400', {}, message);
         });
    }).catch(err => {
        const message = err.message || "Error recovering Match event with id " + id;
        sendResponse(res, 'false', '400', {}, message);
    });
}