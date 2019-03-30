const Sequelize = require("sequelize");
var models = require("../models/");
var Athlete = models.Athlete;
const _ = require("lodash");

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
        res.send(athlete);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "cannot save."
        });
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
        res.send({ athletes });
    }).catch(err => {
        res.status(400).send({
          message: err.message || "cannot retrive."
        });
    });
}

exports.findOne = function (req, res) {
    let IdAthlete = req.body.IdAthlete;

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
            IdAthlete: IdAthlete,
            Status: 1
        }
    }).then(athletes => {
        res.send({ athletes });
    }).catch(err => {
        res.status(400).send({
          message: err.message || "cannot retrive."
        });
    });
}

exports.update = function(req,res){
    let IdAthlete =  req.body.IdAthlete;
    Athlete.findOne({
        where: {
            IdAthlete: IdAthlete,
            Status: '1'
        }
    }).then(athlete => {
        if(!athlete){
            return res.status(404).send({
                message: `Not found. Athlete with id ${IdAthlete}`
            });
        }
        return Athlete.update({
            BirthDate: req.body.BirthDate,
            Team: req.body.Team,
            Captain: req.body.Captain
        },
        {
            where: {
                IdAthlete: IdAthlete,
                Status: '1'
            }
        });
    }).then(result => {
        res.send({
            message: `Update Correct with id ${IdAthlete}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error updating athlete with id " + IdAthlete
        });
    });
}

exports.delete = function(req,res){
    let IdAthlete =  req.body.IdAthlete;
    Athlete.findOne({
        where: {
            IdAthlete: IdAthlete,
            Status: '1'
        }
    }).then(athlete => {
        if(!athlete){
            return res.status(404).send({
                message: `Not found. Athlete with id ${IdAthlete}`
            });
        }
        return Athlete.update({
            Status: '0'
        },
        {
            where: {
                IdAthlete: IdAthlete
            }
        });
    }).then(result => {
        res.send({
            message: `Remmove with id ${IdAthlete}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error removing athlete with id " + IdAthlete
        });
    });
}

exports.recovery = function(req,res){
    let IdAthlete =  req.body.IdAthlete;
    Athlete.findOne({
        where: {
            IdAthlete: IdAthlete,
            Status: '0'
        }
    }).then(athlete => {
        if(!athlete){
            return res.status(404).send({
                message: `Not found. Athlete with id ${IdAthlete}`
            });
        }
        return Athlete.update({
            Status: '1'
        },
        {
            where: {
                IdAthlete: IdAthlete
            }
        });
    }).then(result => {
        res.send({
            message: `Recover with id ${IdAthlete}`
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error recovering athlete with id " + IdAthlete
        });
    });
}