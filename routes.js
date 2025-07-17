const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers.js');
const loginController = require('./src/controllers/loginControllers.js');

// Rotas
route.get('/', homeController.index);

// Rotas de login
route.get('/login', loginController.index)


module.exports = route;