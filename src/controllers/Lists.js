const List = require('../models/List');
const User = require('../models/User');

const { isAuthenticated } = require('../middlewares/auth');


module.exports = {

  async create(req, res) {
    isAuthenticated(req, res);

    const { user } = req.headers;
    const { nome } = req.body
    
    const current_user = await User.findById(user);

    const list = await List.create({
      nome
    });

    return res.json({
      status: "sucesso",
      message: "Lista criada com sucesso!",
      lista: list,
      user: current_user
    })

  },

  update(req, res) {

  },

  delete(req, res) {

  }

}