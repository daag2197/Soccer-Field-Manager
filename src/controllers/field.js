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
            exclude: ['Complex', 'Status']
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
            exclude: ['Complex','Status']
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

    Field.findOne({
        where: {
            IdField: IdField,
            Status: '1'
        }
    }).then(field => {
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
            message: err.message || "Error updating field with id " + req.body.IdField
        });
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
            return res.status(404).send({
                message: `Not found. Field with id ${IdField}`
            })
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
        res.send({
            message: `Remmove with id ${IdField}`
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error removing field with id " + req.body.IdField
        });
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
            return res.status(404).send({
                message: `Not found. Field with id ${IdField}`
            })
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
        res.send({
            message: `Recover with id ${IdField}`
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error recovering field with id " + req.body.IdField
        });
    })
}