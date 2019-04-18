const Sequelize = require('sequelize');
var models = require('../models/');
var Complex = models.Complex;
const _ = require('lodash');
const { sendResponse } = require('../services/responseHandler');

exports.test = function(req,res) {
    console.log(req.query);
    res.send('Greetings from the Test controller!');
}

exports.create = function (req, res) { 
    let complex = {
        ComplexName: req.body.ComplexName,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        Address: req.body.Address
    }

    Complex.create(complex).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

exports.findAll = (req,res) => {
    Complex.findAll({
        attributes: {
            exclude: ['Status']
        },
        where: {
            Status: 1
        }
    })
    .then(complexes => {
        if(complexes == ""){
            sendResponse(res, 'false', '404', {}, `Not found. Complexes`);
        }else{
            sendResponse(res, 'true', '200', complexes);
        }
    }).catch(err => {
        const message = err.message || "cannot retrive."
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.findOne = (req,res) => {

    let id = req.params.id;
    
    Complex.findOne({
        attributes:{
            exclude: ['Status']
        },
        where: {
            id,
            Status: 1
        }
    }).then(complex => {
        if(!complex){
            sendResponse(res, 'false', '404', {}, `Not found. Complex`);
        }else{
            sendResponse(res, 'true', '200', complex);
        }
    }).catch(err => {
        const message = err.message || "cannot retrive."
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.update = (req,res) => {
    let id = req.params.id;
    Complex.findOne({
        where: {
            id,
            status: '1'
        }
    }).then(complex => {
        if(!complex){
            return sendResponse(res, 'false', '404', {}, `Not found. Complex with id ${id}`);
        }
        return Complex.update(
        {
            ComplexName: req.body.ComplexName,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            Address: req.body.Address
        },
        {
            where: {
                id,
                Status: '1'
            }
        }).then(result => {
            const message = `Update Correct with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error updating complex with id " + id;
            sendResponse(res, 'false', '400', {}, message);
        });
    }).catch(err => {
        const message = err.message || "Error updating complex with id " + id;
        sendResponse(res, 'false', '400', {}, message);
    });
}

exports.delete = (req,res) => {

    let id = req.params.id;
    Complex.findOne({
        where: {
            id,
            Status: '1'
        }
    }).then(complex => {
        if(!complex){
            return sendResponse(res, 'false', '404', {}, `Not found. Complex with id ${id}`);
        }
        return Complex.update(
        {
            Status: 0
        },
        {
            where: {
                id
            }
        }).then(result => {
            const message =  `Remove with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error removing complex with id " + id
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        const message = err.message || "Error removing complex with id " + id
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.recovery = (req,res) => {

    let id = req.params.id;
    Complex.findOne({
        where: {
            id,
            Status: '0'
        }
    }).then(complex => {
        if(!complex){
            return sendResponse(res, 'false', '404', {}, `Not found. Complex with id ${id}`);
        }
        return Complex.update(
        {
            Status: 1
        },
        {
            where: {
                id 
            }
        }).then(result => {
            const message = `Recovery with id ${id}`
            sendResponse(res, 'true', '200',message);
        }).catch(err => {
            const message = err.message || "Error recovering Complex with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        const message = err.message || "Error recovering Complex with id " + id;
        sendResponse(res, 'false', '400', {},message);
    });
}