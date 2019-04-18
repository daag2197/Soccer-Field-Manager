const Sequelize = require("sequelize");
var models = require("../models/");
var League = models.League;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');


exports.test = function(req, res) {
  console.log(req.query);
  res.send("Greetings from the Test controller!");
};

exports.create = function (req, res) {
    let league = {
        LeagueName: req.body.LeagueName,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        Complex: req.body.Complex,
        GameDay: req.body.GameDay,
    }

    League.create(league).then(doc => {
        sendResponse(res,'true','200',doc);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

exports.findAll = (req, res) => {
    League.findAll({
        include: [{
            model: models.Complex,
            as: 'Complex Detail',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
            }
        },
        {
            model: models.Day,
            attributes:{
                exclude: ['createdAt','updatedAt']
            }
        }],
        attributes: {
            exclude: ['Complex','GameDay','Status']
        },
        where: {
            Status: 1
        }
    }).then(leagues => {
        if(leagues == ""){
            sendResponse(res, 'false', '404', {}, `Not found. leagues`);
        }else{
            sendResponse(res, 'true', '200', leagues);
        }
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'cannot retrive', err.message);
    });
}

exports.findOne = (req, res) => {
    let IdLeague = req.body.IdLeague;

    League.findOne({
        include: [{
            model: models.Complex,
            as: 'Complex Detail',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
            }
        },
        {
            model: models.Day,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }],
        attributes: {
            exclude: ['Complex', 'Status']
        },
        where: {
            IdLeague: IdLeague,
            status: 1
        }
    }).then(league => {
        if(!league){
            sendResponse(res, 'false', '404', {}, `Not found. league`);
        }else{
            sendResponse(res, 'true', '200', league);
        }
        res.send(league);
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'cannot retrive', err.message);
    });
}

exports.update = (req, res) => {
    let IdLeague = req.body.IdLeague;

    League.findOne({
        where: {
            IdLeague: IdLeague,
            Status: '1'
        }
    }).then(league => {
        if (!league) {
            return sendResponse(res, 'false', '404', {}, `Not found. League with id ${IdLeague}`);
        }
        return League.update(
            {
                LeagueName: req.body.LeagueName,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                Complex: req.body.Complex,
                GameDay: req.body.GameDay
            },
            {
                where: {
                    IdLeague: req.body.IdLeague,
                    Status: '1'
                }
            });
    }).then(result => {
        sendResponse(res, 'true', '200', `Update Correct with id ${IdLeague}`);
    }).catch(err => {
        sendResponse(res, 'false', '500', {}, "Error updating athlete with id " + IdLeague, err.message);
    });
}

exports.delete = (req, res) => {
    let IdLeague = req.body.IdLeague;
    League.findOne({
        where: {
            IdLeague: IdLeague,
            Status: '1'
        }
    }).then(league => {
        if (!league) {
            return sendResponse(res, 'false', '404', {}, `Not found. League with id ${IdLeague}`);
        }
        return League.update({
            Status: 0
        },
            {
                where: {
                    IdLeague: IdLeague
                }
            });
    }).then(result => {
        sendResponse(res, 'true', '200', `Remmove with id ${IdLeague}`);
    }).catch(err => {
        sendResponse(res, 'false', '500', {}, "Error removing league with id " + IdLeague, err.message);
    })
}

exports.recovery = (req, res) => {
    let IdLeague = req.body.IdLeague;
    League.findOne({
        where: {
            IdLeague: IdLeague,
            Status: '0'
        }
    }).then(league => {
        if (!league) {
            return sendResponse(res, 'false', '404', {}, `Not found. League with id ${IdLeague}`);
        }
        return League.update({
            Status: 1
        },
            {
                where: {
                    IdLeague: IdLeague
                }
            });
    }).then(result => {
        sendResponse(res, 'true', '200', `Recover with id ${IdLeague}`);
    }).catch(err => {
        sendResponse(res, 'false', '500', {}, "Error recovering league with id " + IdLeague, err.message);
    })
}