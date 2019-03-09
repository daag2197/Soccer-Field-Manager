const express = require("express");
const League = require("../controllers/league");

const Routes = express.Router();

Routes.get('/test', League.test);

module.exports = Routes;