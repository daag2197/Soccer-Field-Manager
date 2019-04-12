const db = require('../models/index');
const jwt = require('../services/responseHandler');
const responseHandler = require('../services/response');
const User = db.User;

const authenticate = async (req, res, next) => {
  let token = req.header('Authorization');
  if (token) {
    token = token.split('Bearer ')[1];
    if (jwt.verify(token)) {
      const decoded = jwt.decode(token);
      const exp = new Date(decoded.payload.exp * 1000);
      const current = new Date();
      if (exp > current) {
        await User.findOne({ where: { id: decoded.payload.data._id } })
          .then((user) => {
            if (user.status) {
              req.id = user.id;
              req.token = token;
              next();
            } else {
              responseHandler.sendResponse(res, 'false', '400', {}, 'El usuario no existe');
            }
          }).catch((err) => {
            responseHandler.sendResponse(res, 'false', '401', {}, 'Error en el usuario', err.message);
          });
      } else {
        responseHandler.sendResponse(res, 'false', '401', {}, 'El token ha caducado');
      }
    } else {
      responseHandler.sendResponse(res, 'false', '401', {}, 'Token inválido');
    }
  } else {
    responseHandler.sendResponse(res, 'false', '400', {}, 'No se recibio ningun token');
  }
};

module.exports = {
  authenticate,
};
