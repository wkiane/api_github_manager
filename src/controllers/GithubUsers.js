require('dotenv').config();

const axios = require('axios');
const { isAdmin } = require('../middlewares/auth');

const GithubUser = require('../models/GithubUser');

module.exports = {

  async index(req, res) {
    const githubUsers = await GithubUser.find({});

    return res.json(githubUsers);
  },
  
  async create(req, res) {
    
    isAdmin(req, res);

    const { username } = req.body
    
    const githubUserExists = await GithubUser.findOne({ login: username });

    if(githubUserExists) {
      return res.json(githubUserExists);
    }

    const response = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}`);

    const { login, name, bio, location, html_url } = response.data

    console.log(response);
    const githubUser = await GithubUser.create({
      login: login,
      nome: name,
      bio: bio,
      localidade: location,
      html_url: html_url
    });

    return res.json(githubUser);
  }


}