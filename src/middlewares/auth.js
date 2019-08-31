const User = require('../models/User');
const List = require('../models/List');


module.exports = {
  async isAuthenticated(req, res) {  
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    const { user } = req.headers
    const current_user = await User.findById(user, function(err) {
      if(err) {
        return res.json({ status: "error", message: "Você deve estar logado para executar esta ação" });
      }
    });
  },

  async isAdmin(req, res) {
    const { user } = req.headers
    const current_user = await User.findById(user, function(err) {
      if(err) {
        return res.json({ status: "error", message: "Você deve estar logado para executar esta ação" });
      }
    });

    if(!current_user.isAdmin) {
      return res.json({ status: "error", message: "Você não tem permissão para executar esta ação" }); 
    }
  },

  async isMyList(req, res) {
    const { user } = req.headers
    const { listId } = req.params

    const list = await List.findById(listId , function(err) {
      if(err) {
        return res.json({ status: "error", message: "Lista não encontrada!"});
      }
    });

    const current_user = await User.findById(user, function(err) {
      if(err) {
        return res.json({ status: "error", message: "Você deve estar logado para executar esta ação" });
      }
    });

    if(user != list.user) {
      return res.json({ status: "error", message: "Você não pode editar/apagar uma lista que não é sua!" });
    }    
  }
}