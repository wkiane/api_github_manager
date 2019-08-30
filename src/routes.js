const express = require('express');


const Users = require('./controllers/Users');


const routes = express.Router();

routes.post('/users/register', Users.store);
routes.post('/users/authenticate', Users.authenticate);


module.exports = routes;