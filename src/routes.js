const express = require('express');


const Users = require('./controllers/Users');
const GithubUsers = require('./controllers/GithubUsers');
const Lists = require('./controllers/Lists');
const Tags = require('./controllers/Tags');

const routes = express.Router();

routes.get('/users', Users.index);
routes.post('/users/register', Users.create);
routes.post('/users/authenticate', Users.authenticate);

routes.get('/githubusers', GithubUsers.index);
routes.post('/githubusers/new', GithubUsers.create);

routes.get('/lists', Lists.index);
routes.post('/list/new', Lists.create);
routes.put('/list/:listId', Lists.update);
routes.delete('/list/:listId', Lists.delete);

routes.post('/githubusers/:listId', GithubUsers.store);

routes.post('/tags/new', Tags.create);

module.exports = routes;