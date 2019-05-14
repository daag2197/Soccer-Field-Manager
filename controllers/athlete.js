const Sequelize = require("sequelize");
var models = require("../models/");
var Athlete = models.Athlete;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

exports.test = function (req, res) {
    console.log(req.query);
    res.send("Greetings from the Test controller!");
};

exports.create = function (req, res) {
    let athlete = {
        User: req.body.User,
        BirthDate: req.body.BirthDate,
        Team: req.body.Team,
        Captain: req.body.Captain
    }
    Athlete.create(athlete).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

exports.findAll = function (req, res) {
    Athlete.findAll({
        include: [{
            model: models.User,
            as: 'Id User',
            attributes: {          
                exclude: ['Password','UserType','createdAt', 'updatedAt','Status']
            },
            include:[{
                model: models.UserType,
                as: "User Type",
                attributes: {
                    exclude: ['IdUserType','createdAt', 'updatedAt', 'Status']
                }
            }]
        },
        {
            model: models.Team,
            as: 'Athlete Team',
            attributes: {          
                exclude: ['League','IdTeam','createdAt','updatedAt','Status']
            },
            include:[{
                model: models.League,
                as: 'League Detail',
                attributes: {
                    exclude: ['IdLeague','Complex','GameDay','createdAt', 'updatedAt','Status']
                },
                include:[{
                    model: models.Day,
                    attributes:{
                        exclude: ['IdDay','createdAt','updatedAt']
                    }
                },
                {
                    model: models.Complex,
                    as: 'Complex Detail',
                    attributes: {
                        exclude: ['IdComplex','createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
                    }
                }]
            }]
        }],
        attributes: {
            exclude: ['User','Team','League','Status']
        },
        where: {
          Status: 1
        }
    }).then(athletes => {
        if(athletes == ""){
            sendResponse(res, 'false', '404', {}, `Not found. athletes`);
        }else{
            sendResponse(res, 'true', '200', athletes);
        }
    }).catch(err => {
        const message = err.message || "cannot retrive."
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.findOne = function (req, res) {
    const id = req.params.id;
    Athlete.findOne({
        include: [{
            model: models.User,
            as: 'Id User',
            attributes: {          
                exclude: ['Password','UserType','createdAt', 'updatedAt','Status']
            },
            include:[{
                model: models.UserType,
                as: "User Type",
                attributes: {
                    exclude: ['IdUserType','createdAt', 'updatedAt', 'Status']
                }
            }]
        },
        {
            model: models.Team,
            as: 'Athlete Team',
            attributes: {          
                exclude: ['League','IdTeam','createdAt','updatedAt','Status']
            },
            include:[{
                model: models.League,
                as: 'League Detail',
                attributes: {
                    exclude: ['IdLeague','Complex','GameDay','createdAt', 'updatedAt','Status']
                },
                include:[{
                    model: models.Day,
                    attributes:{
                        exclude: ['IdDay','createdAt','updatedAt']
                    }
                },
                {
                    model: models.Complex,
                    as: 'Complex Detail',
                    attributes: {
                        exclude: ['IdComplex','createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
                    }
                }]
            }]
        }],
        attributes: {
            exclude: ['User','Team','League','Status']
        },
        where: {
            id,
            Status: 1
        }
    }).then(athletes => {
        if(!athletes){
            sendResponse(res, 'false', '404', {}, `Not found. athletes`);
        }
        else{
            sendResponse(res, 'true', '200', athletes);
        }
    }).catch(err => {
        const message = err.message || "cannot retrive."
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.update = function(req,res){
    let id = req.params.id;
    Athlete.findOne({
        where: {
            id,
            Status: '1'
        }
    }).then(athlete => {
        if(!athlete){
            return sendResponse(res, 'false', '404', {}, `Not found. Athlete with id ${id}`);
        }
        return Athlete.update({
            BirthDate: req.body.BirthDate,
            Team: req.body.Team,
            Captain: req.body.Captain
        },
        {
            where: {
                id,
                Status: '1'
            }
        }).then(result => {
            const message =  `Update Correct with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error updating athlete with id " + id;
            sendResponse(res, 'false', '400', {}, message);
        });
    }).catch(err => {
        const message = err.message || "Error updating athlete with id " + id;
        sendResponse(res, 'false', '400', {}, message);
    });
}

exports.delete = function(req,res){
    let id =  req.params.id;
    Athlete.findOne({
        where: {
            id,
            Status: '1'
        }
    }).then(athlete => {
        if(!athlete){
            return sendResponse(res, 'false', '404', {}, `Not found. Athlete with id ${id}`);
        }
        return Athlete.update({
            Status: '0'
        },
        {
            where: {
                id
            }
        }).then(result => {
            const message =  `Remmove with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error removing athlete with id " + id;
            sendResponse(res, 'false', '400', {}, message);
        });
    }).catch(err => {
        const message = err.message || "Error removing athlete with id " + id;
        sendResponse(res, 'false', '400', {}, message);
    });
}

exports.recovery = function(req,res){
    let id =  req.params.id;
    Athlete.findOne({
        where: {
            id,
            Status: '0'
        }
    }).then(athlete => {
        if(!athlete){
            return sendResponse(res, 'false', '404', {}, `Not found. Athlete with id ${id}`);
        }
        return Athlete.update({
            Status: '1'
        },
        {
            where: {
                id
            }
        }).then(result => {
            const message = `Recover with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error recovering athlete with id " + id;
            sendResponse(res, 'false', '400', {}, message);
        });
    }).catch(err => {
        const message = err.message || "Error recovering athlete with id " + id;
        sendResponse(res, 'false', '400', {}, message);
    });
}
