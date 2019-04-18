const Sequelize = require('sequelize');
var models = require('../models/');
var Field = models.Field;
const _ = require('lodash');
const { sendResponse } = require('../services/responseHandler');

exports.test = function (req, res) {
    console.log(req.query);
    res.send('Greetings from the Test controller!');
}

exports.create = function(req,res) {
    let field = {
        FieldName: req.body.FieldName,
        Complex: req.body.Complex,
    }
    Field.create(field).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
}

exports.findAll = (req,res) => { 
    Field.findAll({
        include: [{
            model: models.Complex,
            as: 'Complex Detail',
            attributes: {
                exclude: ['createdAt','updatedAt','Latitude','Longitude','Status']
            }
        }],
        attributes: {
            exclude: ['Complex', 'Status']
        },
        where: {
            Status: 1
        }
    }).then(fields => {
        if(fields == ""){
            sendResponse(res, 'false', '404', {}, `Not found. Fields`);
        }else{
            sendResponse(res, 'true', '200', fields);
        }
    }).catch(err => {
        const message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.findOne = (req,res) => {
    let IdField = req.body.IdField;

    Field.findOne({
        include: [{
            model: models.Complex,
            as: 'Complex Detail',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
            }
        }],
        attributes: {
            exclude: ['Complex','Status']
        },
        where: {
            IdField: IdField,
            status: 1
        }
    }).then(field => {
        if(!field){
            sendResponse(res, 'false', '404', {}, `Not found. field`);
        }else{
            sendResponse(res, 'true', '200', field);
        }
    }).catch(err => {
        const message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.update = (req,res) => {
    let IdField = req.body.IdField;

    Field.findOne({
        where: {
            IdField: IdField,
            Status: '1'
        }
    }).then(field => {
        if(!field){
            return sendResponse(res, 'false', '404', {}, `Not found. field`);
        }
        return Field.update(
        {
            FieldName: req.body.FieldName,
            Complex: req.body.Complex
        },
        {
            where: {
                IdField: req.body.IdField,
                Status: '1'
            }
        });
    }).then(result => {
        sendResponse(res, 'true', '200',`Update Correct with id ${IdField}`);
    }).catch(err => {
        const message = err.message || "Error updating field with id " + req.body.IdField
        sendResponse(res, 'false', '500', {}, message);
    });
}

exports.delete = (req,res) => {
    let IdField = req.body.IdField;
    Field.findOne({
        where: {
            IdField: IdField,
            Status: '1'
        }
    }).then(field =>{
        if(!field){
            return sendResponse(res, 'false', '404', {}, `Not found. field`);
        }
        return Field.update({
            Status: 0
        },
        {
            where: {
                IdField: IdField
            }
        });
    }).then(result => {
        sendResponse(res, 'true', '200', `Remmove with id ${IdField}`);
    }).catch(err => {
        const message = err.message || "Error removing field with id " + req.body.IdField
        sendResponse(res, 'false', '500', {}, message);
    })
}

exports.recovery = (req,res) => {
    let IdField = req.body.IdField;
    Field.findOne({
        where: {
            IdField: IdField,
            Status: '0'
        }
    }).then(field =>{
        if(!field){
            return sendResponse(res, 'false', '404', {}, `Not found. field`);
        }
        return Field.update({
            Status: 1
        },
        {
            where: {
                IdField: IdField
            }
        });
    }).then(result => {
        sendResponse(res, 'true', '200', `Recover with id ${IdField}`);
    }).catch(err => {
        const message = err.message || "Error recovering field with id " + req.body.IdField
        sendResponse(res, 'false', '500', {}, message);
    })
}