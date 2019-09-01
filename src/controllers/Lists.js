const List = require('../models/List');
const User = require('../models/User');

const { isAuthenticated, isMyList } = require('../middlewares/auth');


module.exports = {

  async index(req, res) {
    listas = await List.find({}).sort('-createdAt');
    return res.json(listas);
  },

  async create(req, res) {
    isAuthenticated(req, res);

    const { user } = req.headers;
    const { nome } = req.body

    if(!nome) {
      return res.json({ status: "error", message: "Campo nome não pode estar vazio!" });
    }
    
    const current_user = await User.findById(user);

    const list = await List.create({
      nome,
      user: current_user
    });

    return res.json({
      status: "sucesso",
      message: "Lista criada com sucesso!",
      lista: list,
    })

  },

  async update(req, res) {
    isMyList(req, res);

    const { nome } = req.body

    if(!nome) {
      return res.json({ status: "error", message: "Campo nome não pode estar vazio!" });
    }

    var list = await List.findByIdAndUpdate(req.params.listId,{$set:req.body}, function(err) {
      if(err) {
        console.log(err);
      }
    });

    res.json({ status: "sucesso", "data": list })

  },

  async delete(req, res) {
    isMyList(req, res);

    try {
      list = await List.findByIdAndRemove(req.params.listId);
    } catch(err) {
      return res.json({ error: err })
    }

    res.json({ status: "sucesso", message: "lista deletada com sucesso!" });

  }

}

// 
