const Sequelize = require("sequelize");
var models = require("../models/");
var Team = models.Team;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');


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
      sendResponse(res,'true','200',doc);
  }).catch(err => {
      sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
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
    if(teams == ""){
      sendResponse(res, 'false', '404', {}, `Not found. Teams`);
    }
    else{
      sendResponse(res, 'true', '200', teams);
    }
  }).catch(err => {
      const message = err.message || "cannot retrive."
      sendResponse(res, 'false', '400', {}, message);
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
    if(!teams){
      sendResponse(res, 'false', '404', {}, `Not found. Team`);
    }
    else{
      sendResponse(res, 'true', '200', teams);
    }
  }).catch(err => {
    const message = err.message || "cannot retrive."
    sendResponse(res, 'false', '400', {},message);
  });
}

exports.update = (req,res) => {
  let IdTeam = req.body.IdTeam;
  Team.findOne({
    where: {
      IdTeam: IdTeam,
      Status: '1'
    }
  }).then(team => {
    if(!team){
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${IdTeam}`);
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
    sendResponse(res, 'true', '200', `Update Correct with id ${IdTeam}`);
  }).catch(err => {
    const message = err.message || "Error updating team with id " + IdTeam;
    sendResponse(res, 'false', '500', {},message);
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
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${IdTeam}`);
    }
    return Team.update({
      Status: '0'
    },
    {
      where: {
        IdTeam: IdTeam
      }
    });
  }).then(result => {
    sendResponse(res, 'true', '200', `Remmove with id ${IdTeam}`);
  }).catch(err => {
    const message = err.message || "Error removing team with id " + IdTeam;
    sendResponse(res, 'false', '500', {},message);
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
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${IdTeam}`);
    }
    return Team.update({
      Status: '1'
    },
    {
      where: {
        IdTeam: IdTeam
      }
    });
  }).then(result => {
    sendResponse(res, 'true', '200', `Recover with id ${IdTeam}`);
  }).catch(err => {
    const message = err.message ||  "Error recovering team with id " + IdTeam;
    sendResponse(res, 'false', '500', {},message);
  })
}