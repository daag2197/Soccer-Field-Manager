const express = require("express");
const User = require("../controllers/user");

const Routes = express.Router();

Routes.get('/test', User.test);

Routes.post('/create', User.create);

Routes.get('/findall', User.findAll);

Routes.get('/findone', User.findOne);

Routes.put('/update', User.update);

Routes.put('/delete', User.delete);

Routes.put('/recovery', User.recovery);

module.exports = Routes;