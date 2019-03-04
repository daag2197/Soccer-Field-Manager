const Sequelize = require('sequelize');
var models = require('../models/');
var Complex = models.Complex;
const _ = require('lodash');

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
        res.send(complex);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot save."
        });
    });
};

exports.findAll = (req,res) => {
    Complex.findAll({
        where: {
            Status: 1
        }
    })
    .then(complexes => {
        res.send({complexes});
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot retrive."
        });
    });
}

exports.findOne = (req,res) => {

    let IdComplex = req.body.IdComplex;
    
    Complex.findByPk(IdComplex).then(complex => {
        if(!complex){
            return res.status(404).send({
              message: `Not found. Complex with id ${IdComplex}`
            });
        }
        res.send(complex);
    }).catch(err => {
        return res.status(400).send({
            message: err.message || "cannot get."
        });
    });
}

exports.update = (req,res) => {

    let IdComplex = req.body.IdComplex;
    Complex.findByPk(IdComplex).then(complex => {
        if(!complex){
            return res.status(404).send({
                message: `Not found. Complex with id ${IdComplex}`
            })
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
                IdComplex: req.body.IdComplex,
                Status: '1'
            }
        });
    }).then(result => {
        res.send({
            message: `Update Correct with id ${IdComplex}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating product with id " + req.body.IdComplex
        });
    });
}

exports.delete = (req,res) => {

    let IdComplex = req.body.IdComplex;
    Complex.findByPk(IdComplex).then(complex => {
        if(!complex){
            return res.status(404).send({
                message: `Not found. Complex with id ${IdComplex}`
            })
        }
        return Complex.update(
        {
            Status: 0
        },
        {
            where: {
                IdComplex: req.body.IdComplex 
            }
        });
    }).then(result => {
        res.send({
            message: `Remove with id ${IdComplex}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: "Error removing product with id " + req.body.IdComplex
        });
    });
}

exports.recovery = (req,res) => {

    let IdComplex = req.body.IdComplex;
    Complex.findByPk(IdComplex).then(complex => {
        if(!complex){
            return res.status(404).send({
                message: `Not found. Complex with id ${IdComplex}`
            })
        }
        return Complex.update(
        {
            Status: 1
        },
        {
            where: {
                IdComplex: req.body.IdComplex 
            }
        });
    }).then(result => {
        res.send({
            message: `Recovery with id ${IdComplex}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: "Error recovering product with id " + req.body.IdComplex
        });
    });
}