const express = require("express");
const User = require("../controllers/user");
const { adminAuthenticate, authenticate } = require('../middleware/auth');

const Routes = express.Router();

Routes.post('/', User.create);

Routes.get('/', User.findAll);

Routes.get('/:id', User.findOne);

Routes.put('/:id', authenticate, User.update);

Routes.put('/delete/:id', authenticate, User.delete);

// Routes.put('/recovery/:id', User.recovery);

module.exports = Routes;