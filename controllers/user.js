const Sequelize = require("sequelize");
const models = require("../models/");
const querystring = require('querystring');
const User = models.User;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');


const userDetail = (id) => {
  return User.findOne({
    attributes: {
      exclude: ["Status", "Password", "UserType"]
    },
    include: [{
      model: models.UserType,
      as: "User Type",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Status"]
      }
    }],
    where: {
      id,
      Status: '1'
    }
  }).then((u) => {
    return {
      status: true,
      data: u
    }
  }).catch((err) => {
    return {
      status: false,
      data: err.message
    }
  })
};

exports.create = async (req, res) => {
  const body = req.body;
  const user = User.build(body);
  user.save()
    .then(() => user.generateAuthToken())
    .then( async (token) => {
      
      User.findOne({
        attributes: {
          exclude: ["Status", "Password", "UserType"]
        },
        include: [{
          model: models.UserType,
          as: "User Type",
          attributes: {
            exclude: ["createdAt", "updatedAt", "Status"]
          }
        }],
        where: {
          id: user.id,
          Status: '1'
        }
      }).then((u) => {
        sendResponse(res, 'true', '200', u);
      }).catch((err) => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
      })

    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

exports.login = function (req, res) {
  const body = _.pick(req.body, ['email', 'password']);
  let id = 0;
  User.findByCredentials(body.email, body.password)
    .then((found) => {
      id = found.id;
      return found.generateAuthToken();
    }).then(async (token) => {
      const user = await userDetail(id);
      const objRes = {
        user: user['data'],
        token,
      };
      sendResponse(res, 'true', '200', objRes);
    })
    .catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Error en login', err.message);
    });
}

exports.findAll = function (req, res) {
  let limit = 8;
  let str = req.url.split('?')[1];
  let off = querystring.parse(str);
  if(off.offset == undefined) {
    off = 0;
  } else {
    off = off.offset*limit;
  };
  // User.findAndCountAll({
    // offset: off, limit,
  User.findAll({
    attributes: {
      exclude: ["Status", "Password", "UserType"]
    },
    include: [{
      model: models.UserType,
      as: "User Type",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Status"]
      }
    }],
    where: {
      Status: '1'
    }
  }).then((users) => {
      sendResponse(res, 'true', '200', users); 
    }).catch((err) => {
      sendResponse(res, 'false', '404', {}, 'Error al mostrar los usuarios', err.message);
    });
};

const returnDetail = async (req, res, id) => {
  const data = await userDetail(id);
  if(data['status']){
    sendResponse(res, 'true', '200', data['data']);
  } else {
    sendResponse(res, 'false', '400', {}, 'Usuario no encontrado', data['data']);
  }
}

exports.findOne = async (req, res) => {
  returnDetail(req, res, req.params.id);
}

// Update will NOT update the status, password and the email.
exports.update = function(req,res){
  const body = req.body;
  const fieldsToExclude = ['Password', 'Email', 'Status'];
  const myFields = Object.keys(User.rawAttributes).filter( s => !fieldsToExclude.includes(s));
  User.update(body, { fields: myFields, where: { id: req.params.id, Status: '1' } }).then( (r) => {
    if (r) {
      returnDetail(req, res, req.params.id);
    } else {
      sendResponse(res, 'false', '400', {}, 'Error, no se pudo actualizar');
    }
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, err.message);
  });
}

exports.delete = function(req,res){
  let id = req.params.id;
  User.findOne({
    where: {
      id,
      Status: '1'
    }
  }).then(user => {
    if (!user) {
      return sendResponse(res, 'false', '404', {}, `Not Found. user with id ${id}`);
    }
    return User.update({
      Status : '0'
    },
      {
        where: {
          id
        }
      }).then(result => {
        const message = `Remmove with id ${id}`;
        sendResponse(res, 'true', '200', message);
      }).catch(err => {
        const message = err.message || "Error removing user with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error removing user with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.recovery = function(req,res){
  let id = req.params.id;
  User.findOne({
    where: {
      id,
      Status: '0'
    }
  }).then(user => {
    if (!user) {
     return sendResponse(res, 'false', '404', {}, `Not Found. user with id ${id}`);
    }
    return User.update({
      Status : '1'
    },
      {
        where: {
          id
        }
      }).then(result => {
        message = `Recover with id ${result}`;
        sendResponse(res, 'true', '200', message);
      }).catch(err => {
        const message = err.message || "Error recovering user with id " + id;
        sendResponse(res, 'false', '400', {}, message);
      });
  }).catch(err => {
    const message = err.message || "Error recovering user with id " + id;
    sendResponse(res, 'false', '400', {}, message);
  });
}

exports.findAllRef = function (req, res) {
  let limit = 8;
  let str = req.url.split('?')[1];
  let off = querystring.parse(str);
  if(off.offset == undefined) {
    off = 0;
  } else {
    off = off.offset*limit;
  };
  // User.findAndCountAll({
    // offset: off, limit,
  User.findAll({
    attributes: {
      exclude: ["Status", "Password", "UserType"]
    },
    include: [{
      model: models.UserType,
      as: "User Type",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Status"]
      }
    }],
    where: {
      Status: '1',
      UserType: 4
    }
  }).then((users) => {
      sendResponse(res, 'true', '200', users); 
    }).catch((err) => {
      sendResponse(res, 'false', '404', {}, 'Error al mostrar los usuarios', err.message);
    });
};
