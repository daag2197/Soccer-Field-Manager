const Sequelize = require("sequelize");
var models = require("../models/");
var League = models.League;
const _ = require("lodash");

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
        res.send(league);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot save."
        });
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
        res.send({ leagues });
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot retrive."
        });
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
        if (!league) {
            return res.status(404).send({
                message: `Not found. League with id ${IdLeague}`
            });
        }
        res.send(league);
    }).catch(err => {
        return res.status(400).send({
            message: err.message || "cannot get."
        });
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
            return res.status(404).send({
                message: `Not found. League with id ${IdLeague}`
            });
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
        res.send({
            message: `Update Correct with id ${IdLeague}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error updating league with id " + req.body.IdLeague
        });
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
            return res.status(404).send({
                message: `Not found. League with id ${IdLeague}`
            })
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
        res.send({
            message: `Remmove with id ${IdLeague}`
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error removing league with id " + req.body.IdLeague
        });
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
            return res.status(404).send({
                message: `Not found. league with id ${IdLeague}`
            })
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
        res.send({
            message: `Recover with id ${IdLeague}`
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error recovering league with id " + req.body.IdLeague
        });
    })
}