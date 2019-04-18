const express = require("express");
const User = require("../controllers/user");

const Routes = express.Router();

Routes.post('/', User.create);

Routes.get('/findall', User.findAll);

Routes.get('/:id',User.findOne);

Routes.put('/:id', User.update);

Routes.put('/delete/:id', User.delete);

Routes.put('/recovery/:id', User.recovery);

module.exports = Routes;