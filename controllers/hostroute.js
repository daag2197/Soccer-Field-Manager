const Sequelize = require("sequelize");
const models = require("../models/");
var HostRoute = models.HostRoute;
const _ = require("lodash");
const { sendResponse } = require('../services/responseHandler');

//POST
exports.create = (req, res) => {
    //Objeto que recompila la información
    let hostRoute = {
        Name: req.body.Name,
        OriginalUrl: req.body.OriginalUrl,
        Method: req.body.Method,
        Host: req.body.Host,
    }
    //Funcion de Sequelize para guardar en la base de Datos
    HostRoute.create(hostRoute).then(doc => {
        sendResponse(res, 'true', '201', doc, 'Host Added');
    }).catch(err => {
        sendResponse(res, 'false', '400', {}, 'Unable to save host', err.message);
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
        HostRoute.findAll({
            attributes: {
                exclude: ['Active']
            },
            where: {
                Active: true
            }
        }).then(host => {
            if (host.length == 0) {
                sendResponse(res, 'false', '404', {}, 'No Content host')
            } else {
                sendResponse(res, 'true', '200', host);
            }
        }).catch(err => {
            sendResponse(res, 'false', '400', 'Cannot retrive information about hosts.', err.message);
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
        const myFields = Object.keys(HostRoute.rawAttributes).filter(s => !fieldsToExclude.includes(s));
        HostRoute.update(body, {
            fields: myFields,
            where: {
                id,
                Active: true
            }
        }).then((r) => {
            if (r) {
                return returnDetail(req, res, req.params.id);
            } else {
                return sendResponse(res, 'false', '400', {}, 'Error,Canot update host');
            }
        }).catch((err) => {
            sendResponse(res, 'false', '400', {}, 'Error,Canot update host', err.message);
        });
    }
}
//DELETE
exports.delete = (req, res) => {
    let id = req.params.id
    if (isNaN(id) && id != undefined) {
        sendResponse(res, 'false', '400', {}, 'Input a correct type value')
    } else {
        HostRoute.findOne({
            where: {
                id,
                Active: true
            }
        }).then(host => {
            if (!host) {
                return sendResponse(res, 'false', '404', {}, 'No Content Host')
            }
            return HostRoute.update({
                Active: false
            }, {
                where: {
                    id
                }
            }).then(result => {
                sendResponse(res, 'true', '204', {}, 'Not Content Host')
            }).catch(err => {
                sendResponse(res, 'false', '400', {}, "Error removing Host", err.message);
            });
        }).catch(err => {
            sendResponse(res, 'false', '400', {}, "Error removing Host", err.message);
        });
    }
}


//Detalle
const HostDetail = (id) => {
    return HostRoute.findOne({
        attributes: {
            exclude: ["Active"]
        },
        where: {
            id,
            Active: true
        }
    }).then((host) => {
        if (host) {
            return {
                code: '200',
                status: true,
                data: host
            }
        } else {
            return {
                code: '404',
                status: false,
                data: 'No Content host'
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

const returnDetail = async (req, res, id) => {
    const data = await HostDetail(id);
    if (data['status']) {
        sendResponse(res, 'true', data['code'], data['data']);
    } else {
        sendResponse(res, 'false', data['code'], {}, data['data']);
    }
}