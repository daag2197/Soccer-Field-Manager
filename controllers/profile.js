const Sequelize = require("sequelize");
const models = require("../models/");
var Profile = models.Profile;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

//POST
exports.create = (req, res) => {
    //Objeto que recompila la información
    let profile = {
        Description: req.body.Description
    }
    //Funcion de Sequelize para guardar en la base de Datos
    Profile.create(profile).then(doc => {
        sendResponse(res, 'true', '201', doc,'Profile Added');
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save profile', err.message);
    });
};

//GET
exports.find = (req, res) => { 
  let id = req.params.id
  //Validamos que venga el valor correcto
  if (isNaN(id) && id != undefined) {
    sendResponse(res, 'false', '400', {}, 'Input a correct type value')
  } else if (id != undefined || id != null) {
    //Hacemos la busqueda de un elemento
    returnDetail(req, res, req.params.id);
  } else {
    //Buscamos todos
    Profile.findAll({
      attributes: {
        exclude: ['Active']
      },
      where: {
        Active: true
      }
    }).then(profile => {
      if (profile.length == 0) {
        sendResponse(res, 'false', '404', {}, 'No Content profile')
      } else {
        sendResponse(res, 'true', '200', profile);
      }
    }).catch(err => {
      sendResponse(res, 'false', '400', 'Cannot retrive information about profiles.', err.message);
    });
  }
}

//PUT
exports.update = (req, res) => {
  let id = req.params.id
  if (isNaN(id) && id != undefined) {
    sendResponse(res, 'false', '400', {}, 'Input a correct type value')
  } else {
    const body = req.body;
    const fieldsToExclude = ['Active'];
    const myFields = Object.keys(Profile.rawAttributes).filter(s => !fieldsToExclude.includes(s));
    Profile.update(body, {
      fields: myFields,
      where: {
        id,
        Active: true
      }
    }).then((r) => {
      if (r) {
        return returnDetail(req, res, req.params.id);
      } else {
        return sendResponse(res, 'false', '400', {}, 'Error,Canot update profile');
      }
    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Error,Canot update profile', err.message);
    });
   }
 }

//DELETE
exports.delete = (req, res) => {
  let id = req.params.id
  if (isNaN(id) && id != undefined) {
    sendResponse(res, 'false', '400', {}, 'Input a correct type value')
  } else {
    Profile.findOne({
      where: {
        id,
        Active: true
      }
    }).then(profile => {
      if (!profile) {
        return sendResponse(res, 'false', '404', {}, 'No Content Profile')
      }
      return Profile.update({
        Active: false
      }, {
        where: {
          id
        }
      }).then(result => {
        sendResponse(res, 'true', '204', {}, 'Not Content Profile')
      }).catch(err => {
        sendResponse(res, 'false', '400', {}, "Error removing Profile", err.message);
      });
    }).catch(err => {
      sendResponse(res, 'false', '400', {}, "Error removing Profile", err.message);
    });
  }
}

//Obtener Detalles
const profileDetail = (id) => {
  return Profile.findOne({
    attributes: {
      exclude: ["Active"]
    },
    where: {
      id,
      Active: true
    }
  }).then((pro) => {
    if (pro) {
      return {
        code: '200',
        status: true,
        data: pro
      }
    } else {
      return {
        code: '404',
        status: false,
        data: 'No Content Profile'
      }
    }
  }).catch((err) => {
    return {
      code: '400',
      status: false,
      data: err.message
    }
  })
}

//Return detail profile
const returnDetail = async (req, res, id) => {
  const data = await profileDetail(id);
  if (data['status']) {
    sendResponse(res, 'true', data['code'], data['data']);
  } else {
    sendResponse(res, 'false', data['code'], {}, data['data']);
  }
}