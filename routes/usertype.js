const express = require("express");
const UserType = require("../controllers/usertype");

const Routes = express.Router();

Routes.get('/test', UserType.test);

//Create
Routes.post('/', UserType.create);

//Show All
Routes.get('/findall', UserType.findAll);

//Search One
Routes.get('/:id',UserType.findOne);

//Update
Routes.put('/:id', UserType.update);

//Delete
Routes.put('/delete/:id', UserType.delete);

//Recovery
Routes.put('/recovery/:id', UserType.recovery);

module.exports = Routes;