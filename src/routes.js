const express = require('express');


const Users = require('./controllers/Users');
const GithubUsers = require('./controllers/GithubUsers');
const Lists = require('./controllers/Lists');

const routes = express.Router();

routes.get('/users', Users.index);
routes.post('/users/register', Users.create);
routes.post('/users/authenticate', Users.authenticate);

routes.get('/githubusers', GithubUsers.index);
routes.post('/githubusers/new', GithubUsers.create);

routes.post('/list/new', Lists.create);

module.exports = routes;