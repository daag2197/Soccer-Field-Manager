const Sequelize = require('sequelize');
var models = require('../models/');
var Field = models.Field;
const _ = require('lodash');

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
        res.send(field);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot save."
        });
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
            exclude: ['Complex', 'Status', 'createdAt', 'updatedAt']
        },
        where: {
            Status: 1
        }
    }).then(fields => {
        res.send({ fields });
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot retrive."
        });
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
            exclude: ['Complex','Status','createdAt', 'updatedAt']
        },
        where: {
            IdField: IdField,
            status: 1
        }
    }).then(field => {
        if(!field){
            return res.status(404).send({
                message: `Not found. Field with id ${IdField}`
            });
        }
        res.send(field);
    }).catch(err => {
        return res.status(400).send({
            message: err.message || "cannot get."
        });
    });
}

exports.update = (req,res) => {
    let IdField = req.body.IdField;

    Field.findByPk(IdField).then(field => {
        if(!field){
            return res.status(404).send({
                message: `Not found. Field with id ${IdField}`
            });
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
        res.send({
            message: `Update Correct with id ${IdField}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating field with id " + req.body.IdField
        });
    });
}