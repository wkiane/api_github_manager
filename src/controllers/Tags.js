
const GithubUser = require('../models/GithubUser');
const Tag = require('../models/Tag');
const { isAuthenticated } = require('../middlewares/auth');


module.exports = {
  async index(req, res) {
    const tags = await Tag.find({}).sort('-createdAt');
    return res.json(tags);
  },

  async create(req, res) {
    isAuthenticated(req, res);
    const { login, tag_name } = req.body;

    if(!login) {
      return res.json({ error: 'Campo login não pode estar vazio!' });
    } else if (!tag_name) {
      return res.json({ error: 'Campo tag_name não pode estar vazio' });
    }

    const githubUser = await GithubUser.findOne({ login }, function(err) {
      if(err) {
        return res.json({ "error": err });
      };
    });

    const tagExists = await Tag.findOne({ nome: tag_name })
    if(!tagExists) {
      const new_tag = Tag.create({
        nome: tag_name,
        github: githubUser._id
      });

      return res.json({ status: "sucesso", message: "Tag adcionada a usuário!" });      
    }

    if(githubUser.tags.includes(tagExists._id)) {
      return res.json({ message: "Githubuser já tem essa tag!" })
    }

    githubUser.tags.push(tagExists._id);
    await tagExists.save();
    await githubUser.save();


    return res.json({ status: "sucesso", message: "Tag adcionada a usuário!" });


  }
}