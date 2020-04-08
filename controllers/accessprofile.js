const Sequelize = require("sequelize");
const models = require("../models/");
var AccessProfile = models.AccessProfile;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

//POST
exports.create = (req,res) => {
    //Objeto
    let Access = {
        IdProfile: req.body.IdProfile,
        IdHostRoute: req.body.IdHostRoute
    }

    //Funcion de Sequelize para guardar
    AccessProfile.create(Access).then(doc => {
        sendResponse(res,'true','201',doc,'Access Added');
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save access', err.message);
    });
}

//GET 
exports.find = (req,res) => {
    let profile = req.body.IdProfile;
    let Host = req.body.IdHostRoute;
    
    AccessProfile.findOne({
        attributes: {
            exclude: ["IdProfile","IdHostRoute"]
        },
        where: {
            IdHostRoute: Host,
            IdProfile: profile
        },
        include: [{
            model: models.Profile,
            as: "profile",
            attributes: {
                exclude: ["createdAt", "updatedAt", "Active"]
            }
        },{
            model: models.HostRoute,
            as: "host",
            attributes: {
                exclude: ["createdAt", "updatedAt","Host"]
            }
        }]
    }).then((access) => {
        if (access.length == 0) {
            sendResponse(res, 'false', '404', {}, 'No Content access')
        } else {
            sendResponse(res, 'true', '200', access);
        }
    }).catch((err) => {
        sendResponse(res, 'false', '404', {}, 'Cannot retrive information about access.', err.message);
    });
}

//DELETE
exports.delete = (req,res) => {
   let id = req.params.id
   if (isNaN(id) && id != undefined) {
       sendResponse(res, 'false', '400', {}, 'Input a correct type value')
   } else {
       AccessProfile.destroy({
           where: {
               id
           }
       }).then(result => {
            sendResponse(res, 'true', '204', {}, 'Not Content User')
       }).catch(err => {
            sendResponse(res, 'false', '400', {}, "Error removing User", err.message);
       });
   }
}