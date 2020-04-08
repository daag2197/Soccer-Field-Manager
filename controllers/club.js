//Blibliotecas
const Sequelize = require("sequelize");
const _ = require("lodash");

//Modelos
const models = require("../models/");
var Club = models.Club;
var Access = models.AccessProfile;

//Manejo de Respuesta
const { sendResponse } = require('../services/responseHandler');

//POST
exports.create = async (req,res) => {
    const body = _.pick(req.body, ['Name', 'Latitude', 'Longitude', 'Address', 'Suburb']);
    console.log(req.originalUrl);
    console.log(req.method);
    let value = Access.ValidateAdmin(1, 2);
    console.log(value);

    if (value == true) {
        //Funcion de Sequelize para guardar en la base de Datos
        Club.create(body).then(doc => {
            sendResponse(res, 'true', '201', doc, 'Club Added');
        }).catch(err => {
            sendResponse(res, 'false', '400', {}, 'Unable to save club', err.message);
        });
    } else {
        sendResponse(res,'false','403',{},"You doesn't have access to this route",{});
    }
}
