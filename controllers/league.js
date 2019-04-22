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
        const message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.findOne = (req, res) => {
    let id = req.params.id;

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
           id,
           status: 1
        }
    }).then(league => {
        if(!league){
            sendResponse(res, 'false', '404', {}, `Not found. league`);
        }else{
            sendResponse(res, 'true', '200', league);
        }
    }).catch(err => {
        const message = err.message || 'cannot retrive';
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;

    League.findOne({
        where: {
            id,
            Status: '1'
        }
    }).then(league => {
        if (!league) {
            return sendResponse(res, 'false', '404', {}, `Not found. League with id ${id}`);
        }
        return League.update({
            LeagueName: req.body.LeagueName,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Complex: req.body.Complex,
            GameDay: req.body.GameDay
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
            const message = err.message ||  "Error updating league with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        const message = err.message ||  "Error updating league with id " + id;
        sendResponse(res, 'false', '400', {},message);
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;
    League.findOne({
        where: {
            id,
            Status: '1'
        }
    }).then(league => {
        if (!league) {
            return sendResponse(res, 'false', '404', {}, `Not found. League with id ${id}`);
        }
        return League.update({
            Status: 0
        },
        {
            where: {
                id
            }
        }).then(result => {
            const message = `Remmove with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error removing league with id " + id;
            sendResponse(res, 'false', '400', {},message);
        });
    }).catch(err => {
        const message = err.message || "Error removing league with id " + id;
        sendResponse(res, 'false', '400', {},message);
    })
}

exports.recovery = (req, res) => {
    let id = req.params.id;
    League.findOne({
        where: {
            id,
            Status: '0'
        }
    }).then(league => {
        if (!league) {
            return sendResponse(res, 'false', '404', {}, `Not found. League with id ${id}`);
        }
        return League.update({
            Status: 1
        },
        {
            where: {
                id
            }
        }).then(result => {
            const message = `Recover with id ${id}`
            sendResponse(res, 'true', '200', message);
        }).catch(err => {
            const message = err.message || "Error recovering league with id " + id;
            sendResponse(res, 'false', '400', {}, "" + id,message);
        });
    }).catch(err => {
        const message = err.message || "Error recovering league with id " + id;
        sendResponse(res, 'false', '400', {}, "" + id,message);
    });
}