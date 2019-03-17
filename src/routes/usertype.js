const express = require("express");
const UserType = require("../controllers/usertype");

const Routes = express.Router();

Routes.get('/test', UserType.test);

Routes.post('/create',UserType.create);

Routes.get('/findall',UserType.findAll);

Routes.get('/findone',UserType.findOne);

Routes.put('/update',UserType.update);

Routes.put('/delete',UserType.delete);

Routes.put('/recovery',UserType.recovery);

module.exports = Routes;