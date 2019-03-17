const Sequelize = require("sequelize");
var models = require("../models/");
var Team = models.Team;
const _ = require("lodash");

exports.test = function(req, res) {
  console.log(req.query);
  res.send("Greetings from the Test controller!");
};

exports.create = function (req, res) {
  let team = {
      TeamName: req.body.TeamName,
      League: req.body.League
  }

  Team.create(team).then(doc => {
      res.send(team);
  }).catch(err => {
      res.status(400).send({
          message: err.message || "cannot save."
      });
  });
};

exports.findAll = (req, res) => {
  Team.findAll({
      include: [{
          model: models.League,
          as: 'League Detail',
          attributes: {
              exclude: ['Complex','GameDay','createdAt', 'updatedAt','Status']
          },
          include:[{
            model: models.Day,
            attributes:{
              exclude: ['createdAt','updatedAt']
            }
          },
          {
            model: models.Complex,
            as: 'Complex Detail',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
            }
          }]
      }],
      attributes: {
          exclude: ['League','Status']
      },
      where: {
          Status: 1
      }
  }).then(teams => {
      res.send({ teams });
  }).catch(err => {
      res.status(400).send({
          message: err.message || "cannot retrive."
      });
  });
}

exports.findOne = (req, res) => {
  let IdTeam = req.body.IdTeam;

  Team.findOne({
    include: [{
        model: models.League,
        as: 'League Detail',
        attributes: {
            exclude: ['Complex','GameDay','createdAt', 'updatedAt','Status']
        },
        include:[{
          model: models.Day,
          attributes:{
            exclude: ['createdAt','updatedAt']
          }
        },
        {
          model: models.Complex,
          as: 'Complex Detail',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'Latitude', 'Longitude', 'Status']
          }
        }]
    }],
    attributes: {
        exclude: ['League','Status']
    },
    where: {
      IdTeam: IdTeam,
      Status: 1
    }
  }).then(teams => {
    res.send({ teams });
  }).catch(err => {
    res.status(400).send({
      message: err.message || "cannot retrive."
    });
  });
}

exports.update = (req,res) => {
  let IdTeam = req.body.IdTeam;
  Team.findOne({
    where: {
      IdTeam: IdTeam,
      status: '1'
    }
  }).then(team => {
    if(!team){
      return res.status(404).send({
        message: `Not found. Team with id ${IdTeam}`
      });
    }
    return Team.update(
      {
        TeamName: req.body.TeamName,
        League: req.body.League
      },
      {
        where: {
          IdTeam: IdTeam,
          Status: '1'
        }
      });
  }).then(result => {
    res.send({
      message: `Update Correct with id ${IdTeam}`
    });
  }).catch(err => {
    return res.status(500).send({
        message: err.message || "Error updating team with id " + IdTeam
    });
  });
}

exports.delete = (req,res) =>{
  let IdTeam = req.body.IdTeam;
  Team.findOne({
    where: {
      IdTeam: IdTeam,
      Status: '1'
    }
  }).then(team => {
    if (!team) {
      return res.status(404).send({
        message: `Not found. Team with id ${IdTeam}`
      })
    }
    return Team.update({
      Status: 0
    },
    {
      where: {
        IdTeam: IdTeam
      }
    });
  }).then(result => {
    res.send({
      message: `Remmove with id ${IdTeam}`
    })
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error removing team with id " + IdTeam
    });
  })
}

exports.recovery = (req,res) => {
  let IdTeam = req.body.IdTeam;
  Team.findOne({
    where: {
      IdTeam: IdTeam,
      Status: '0'
    }
  }).then(team => {
    if (!team) {
      return res.status(404).send({
        message: `Not found. Team with id ${IdTeam}`
      })
    }
    return Team.update({
      Status: 1
    },
    {
      where: {
        IdTeam: IdTeam
      }
    });
  }).then(result => {
    res.send({
      message: `Recover with id ${IdTeam}`
    })
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error recovering team with id " + IdTeam
    });
  })
}