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
  await teams.forEach(async (team, idx) => {
    cont = idx;
    const t = {
      Tournament: Tournament.id,
      Team: team,
      Status: 1,
    }
    await TournamentDetails.create(t).then((t) => {
      if (cont == (teams.length - 1)) {
        sendResponse(res, 'true', '200', Tournament);
      }
    });
  });
};


const deleteAll = async(tournament) => {
  TournamentDetails.dest({
    where: { Tournament: tournament.id },
  }).then((all) => {
    all.forEach((elem) => {
      elem.Status = 0;
      elem.save();
    });
  }).catch((err) => {
    console.log(err);
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
      where: { Status: 1 },
      include: [{
        model: models.Team,
        as: 'idTeam',
      }]
    }, {
      model: models.League,
      as: 'idLeague',
    }],
  }).then((tournament) => {
    if (!tournament)
      sendResponse(res, 'false', '404', {}, 'No se pudo obtener el torneo', err.message);
    sendResponse(res, 'true', '200', tournament);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'error al obtener el torneo', err.message);
  })
};

exports.findAll = async (req, res) => {
  return Tournament.findAll({
    include: [{
      model: models.TournamentDetails,
      where: { Status: 1 },
      include: [{
        model: models.Team,
        as: 'idTeam',
      }]
    }, {
      model: models.League,
      as: 'idLeague',
    }],
  }).then((arr) => {
    sendResponse(res, 'true', '200', arr);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'error al crear el torneo', err.message);
  });
};

exports.update = async (req, res) => {
  let id = req.params.id;
  const body = req.body;
  const reqTournament = body.tournament;
  const reqTeams = body.teams;

  return Tournament.findOne({
    where: {
      Status: '1',
      id,
    },
  }).then(tournament => {
    if (!tournament) {
      return sendResponse(res, 'false', '404', {}, `Not found. Tournament with id ${id}`);
    }
    return Tournament.update({
      Name: reqTournament.Name
    },
      {
        where: {
          Status: '1',
          id
        }
      }).then(async (result) => {
        await TournamentDetails.destroy({
          where: { Tournament: id },
        }).then(async () => {
          tournament.Name = reqTournament.Name;
          await bulkInsert(res, reqTeams, tournament);
        }).catch((err) => {
          sendResponse(res, 'false', '400', {}, 'Error al actualizar', err.message);
        })
      }).catch(err => {
        const message = err.message || "Error updating tournament with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error updating tournament with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.delete = async (req, res) => {
  let id = req.params.id;
  return Tournament.findOne({
    where: {
      Status: '1',
      id
    }
  }).then(tournament => {
    if (!tournament) {
      return sendResponse(res, 'false', '404', {}, `Not found. Tournament with id ${id}`);
    }
    return Tournament.update({
      Status: '0'
    },
      {
        where: {
          Status: '1',
          id
        }
      }).then(result => {
        const message = `delete Correct with id ${id}`
        sendResponse(res, 'true', '200', message);
      }).catch(err => {
        const message = err.message || "Error deleting tournament with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error deleting tournament with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

