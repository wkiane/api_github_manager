require('dotenv').config();

const axios = require('axios');
const { isAdmin, isMyList } = require('../middlewares/auth');

const GithubUser = require('../models/GithubUser');
const List = require('../models/List');

module.exports = {

  async index(req, res) {
    const githubUsers = await GithubUser.find({});

    return res.json(githubUsers);
  },

  async store(req, res) {
    isMyList(req, res);

    const { listId } = req.params;
    const { login } = req.body;

    

    const list = await List.findById(listId);
    const githubUser = await GithubUser.findOne({ login }, function(err) {
      if(err) {
        return res.json({ "error": err });
      }
    })

    if(!list) {
      return res.json({ status: "error", message: "Lista não encontrada" });
    }

    if(!githubUser) {
      return res.json({ status: "error", message: "Usuário github não encontrado" });
    }

    if(list.githubusers.includes(githubUser._id)) {
      return res.json({ message: "Usuário já cadastrado na lista"});
    }

    list.githubusers.push(githubUser._id);
    const new_list = await list.save();

    if(!githubUser) {
      return res.json({ status: "error", message: "Algo deu errado!" });
    }

    githubUser.lists.push(new_list);
    const new_githubuser = await githubUser.save();

    return res.json(githubUser);
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