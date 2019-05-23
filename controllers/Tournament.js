const db = require('../models/index');
const Sequelize = require("sequelize");
const models = require("../models/");
const { sendResponse } = require('../services/responseHandler');

const Tournament = models.Tournament;
const TournamentDetails = models.TournamentDetails;
const League = models.League;
const Season = models.Season;
const Team = models.Team;


const bulkInsert = async (res, teams, Tournament) => {
  let cont = 0;
  await teams.forEach(async(team, idx) => {
    cont = idx;
    const t = {
      Tournament: Tournament.id,
      Team: team,
      Status: 1,
    }
    await TournamentDetails.create(t).then((t) => {
      if (cont == (teams.length-1)) {
        sendResponse(res, 'true', '200', Tournament);
      }
    });
  });
}

exports.create = async (req, res) => {
  const body = req.body;
  const reqTournament = body.tournament;
  const reqTeams = body.teams;
  const idLeague = reqTournament.IdLeague;

  if (reqTeams.length > 5) {
    myTournament = {};
    tournament = Tournament.build({
      Name: reqTournament.Name,
      IdLeague: idLeague,
      Season: 0,
      Phase: 0,
    });
    await tournament.save()
    .then(async (tour) => {
      myTournament = tour;
      
      await bulkInsert(res, reqTeams, myTournament);
      
    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'error al crear el torneo', err.message);
    });
    
  } else {
    sendResponse(res, 'false', '400', {}, 
      'La cantidad mínima de un torneo son 5 equipos', 
      'Cantidad minima de equipos no permitida');
  }

};

exports.findOne = async (req, res) => {
  return Tournament.findOne({
    where: {
      id: req.params.id,
    },
    include: [{
      model: models.TournamentDetails,
      include: [{
        model: models.Team,
        as: 'idTeam',
      }]
    }, {
      model: models.League,
      as: 'idLeague',
    }],
  }).then((tournament) => {
    sendResponse(res, 'true', '200', tournament);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'error al crear el torneo', err.message);
  })
}
