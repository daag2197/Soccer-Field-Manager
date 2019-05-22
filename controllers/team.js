const Sequelize = require("sequelize");
var models = require("../models/");
var Team = models.Team;
var Athlete = models.Athlete;
var User = models.User;

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
  let id = req.params.id;

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
      id,
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

exports.findPlayersByIdTeam = (req,res) => {
  let id = req.params.id;
  Team.findOne({
    attributes: {
      exclude: ['League','Status','createdAt', 'updatedAt']
    },
    where: {
      id,
      Status: '1'
    }
  }).then(team =>{
    if(!team){
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
    }
    return Athlete.findAll({
      include: [{
        model: models.User,
        as: 'Id User',
        attributes: {          
            exclude: ['id','Email','Path','Password','UserType','createdAt', 'updatedAt','Status']
        }
      }],
      attributes: {
        exclude: ['BirthDate','User','Team','Status','createdAt', 'updatedAt']
      },
      where: {
        Team: id,
        Status: 1
      }
    }).then(players =>{
      const ObjPlayer = {
        team,
        players: players
      }
      sendResponse(res, 'true', '200', ObjPlayer);
    }).catch(err => {
      const message = err.message ||  "Error looking with IdTeam " + id;
      sendResponse(res, 'false', '400', {},message);
    });
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'Error in route', err.message);
  });
}

exports.update = (req,res) => {
  let id = req.params.id;
  Team.findOne({
    where: {
      id,
      Status: '1'
    }
  }).then(team => {
    if(!team){
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
    }
    return Team.update(
      {
        TeamName: req.body.TeamName,
        League: req.body.League
      },
      {
        where: {
          id,
          Status: '1'
        }
      }).then(result => {
        const message = `Update Correct with id ${id}`
        sendResponse(res, 'true', '200',message);
      }).catch(err => {
        const message = err.message || "Error updating team with id " + id;
        sendResponse(res, 'false', '400', {},message);
      });
  }).catch(err => {
    const message = err.message || "Error updating team with id " + id;
    sendResponse(res, 'false', '400', {},message);
  });
}

exports.delete = (req,res) =>{
  let id = req.params.id;
  Team.findOne({
    where: {
      id,
      Status: '1'
    }
  }).then(team => {
    if (!team) {
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
    }
    return Team.update({
      Status: '0'
    },
    {
      where: {
        id
      }
    }).then(result => {
      const message = `Remmove with id ${id}`
      sendResponse(res, 'true', '200', message);
    }).catch(err => {
      const message = err.message || "Error removing team with id " + id;
      sendResponse(res, 'false', '400', {},message);
    });
  }).catch(err => {
    const message = err.message || "Error removing team with id " + id;
    sendResponse(res, 'false', '400', {},message);
  });
}

exports.recovery = (req,res) => {
  let id = req.params.id;
  Team.findOne({
    where: {
      id,
      Status: '0'
    }
  }).then(team => {
    if (!team) {
      return sendResponse(res, 'false', '404', {}, `Not found. Team with id ${id}`);
    }
    return Team.update({
      Status: '1'
    },
    {
      where: {
        id
      }
    }).then(result => {
      const message = `Recover with id ${id}`
      sendResponse(res, 'true', '200',message);
    }).catch(err => {
      const message = err.message ||  "Error recovering team with id " + id;
      sendResponse(res, 'false', '400', {},message);
    });
  }).catch(err => {
    const message = err.message ||  "Error recovering team with id " + id;
    sendResponse(res, 'false', '400', {},message);
  });
}
