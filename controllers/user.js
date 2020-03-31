const Sequelize = require("sequelize");
const models = require("../models/");
const querystring = require('querystring');
const User = models.User;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');


//POST
exports.create = async (req, res) => {
  const body = req.body;
  const user = User.build(body);
  user.save()
    .then(() => user.generateAuthToken())
    .then( async (token) => {
      
      User.findOne({
        attributes: {
          exclude: ["Active", "Password", "IdProfile"]
        },
        include: [{
          model: models.Profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt", "Active"]
          }
        }],
        where: {
          id: user.id,
          Active: true
        }
      }).then((u) => {
        sendResponse(res, 'true', '201', u, 'User Added');
      }).catch((err) => {
        sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
      })

    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Unable to save', err.message);
    });
};

//GET
exports.find = (req,res) => {
  let id = req.params.id;
  if (isNaN(id) && id != undefined) {
    sendResponse(res, 'false', '400', {}, 'Input a correct type value')
  } else if (id != undefined || id != null) {
    //Busqueda de un Elemento
    returnDetail(req, res, req.params.id);
  } else {
    //Paginacion
    let limit = 8;
    let str = req.url.split('?')[1];
    let off = querystring.parse(str);
    if (off.offset == undefined) {
      off = 0;
    } else {
      off = off.offset * limit;
    };
    User.findAll({
    // User.findAndCountAll({
    // offset: off, limit,
      attributes: {
        exclude: ["Active", "Password", "Profile"]
      },
      include: [{
        model: models.Profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "Active"]
        }
      }],
      where: {
        Active: true
      }
    }).then((users) => {
      if (users.length == 0) {
        sendResponse(res, 'false', '404', {}, 'No Content users')
      } else {
        sendResponse(res, 'true', '200', users);
      }
    }).catch((err) => {
      sendResponse(res, 'false', '404', {}, 'Cannot retrive information about users.', err.message);
    });
  }
}

//PUT Update will NOT update the status, password and the email.
exports.update = (req,res) => {
  let id = req.params.id
  if (isNaN(id) && id != undefined) {
    sendResponse(res, 'false', '400', {}, 'Input a correct type value')
  } else {
    const body = req.body;
    const fieldsToExclude = ['id','Password', 'Email', 'Active'];
    const myFields = Object.keys(User.rawAttributes).filter( s => !fieldsToExclude.includes(s));
    User.update(body, { 
      fields: myFields, 
      where: { 
        id,
        Active: true
      } 
    }).then( (r) => {
      if (r) {
        returnDetail(req, res, req.params.id);
      } else {
        sendResponse(res, 'false', '400', {}, 'Error,Canot update user');
      }
    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Error,Canot update user', err.message);
    });
  }
}

//DELETE
exports.delete = (req,res) => {
  let id = req.params.id
  if (isNaN(id) && id != undefined) {
    sendResponse(res, 'false', '400', {}, 'Input a correct type value')
  } else {
    User.findOne({
      where: {
        id,
        Active: true
      }
    }).then(user => {
      if (!user) {
        return sendResponse(res, 'false', '404', {}, 'No Content User');
      }
      return User.update({
        Active : false
      },
        {
          where: {
            id
          }
        }).then(result => {
           sendResponse(res, 'true', '204', {}, 'Not Content User')
        }).catch(err => {
          sendResponse(res, 'false', '400', {}, "Error removing User", err.message);
        });
    }).catch(err => {
      sendResponse(res, 'false', '400', {}, "Error removing User", err.message);
    });
  }
}

//GET 
exports.findbyprofile = function (req, res) {
  let id = req.params.id;
  let limit = 8;
  let str = req.url.split('?')[1];
  let off = querystring.parse(str);
  if(off.offset == undefined) {
    off = 0;
  } else {
    off = off.offset*limit;
  };
  User.findAll({
  //User.findAndCountAll({
  // offset: off, limit,
    attributes: {
      exclude: ["Active", "Password", "IdProfile"]
    },
    include: [{
      model: models.Profile,
      as: "profile",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Active"]
      }
    }],
    where: {
      Active: true,
      IdProfile: id
    }
  }).then((users) => {
      sendResponse(res, 'true', '200', users); 
    }).catch((err) => {
      sendResponse(res, 'false', '404', {}, 'Cannot retrive information about users.', err.message);
    });
};

//Metodo para logear un usuario
exports.login = (req, res) => {
  const body = _.pick(req.body, ['Email', 'Password']);
  let id = 0;
  User.findByCredentials(body.Email, body.Password)
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

//Retornar Detalle
const returnDetail = async (req, res, id) => {
  const data = await userDetail(id);
  if (data['status']) {
    sendResponse(res, 'true', '200', data['data']);
  } else {
    sendResponse(res, 'false', '404', {}, 'Not data found', data['data']);
  }
}

//Obtener Detalles de Usuario
const userDetail = (id) => {
  return User.findOne({
    attributes: {
      exclude: ["Active", "Password", "IdProfile"]
    },
    include: [{
      model: models.Profile,
      as: "profile",
      attributes: {
        exclude: ["createdAt", "updatedAt", "Active"]
      }
    }],
    where: {
      id,
      Active: true
    }
  }).then((u) => {
    if (u) {
      return {
        code: '200',
        status: true,
        data: u
      }
    } else {
      return {
        code: '404',
        status: false,
        data: 'No Content User'
      }
    }

  }).catch((err) => {
    return {
      code: '400',
      status: false,
      data: err.message
    }
  })
};