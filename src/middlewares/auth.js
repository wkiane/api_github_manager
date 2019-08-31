const User = require('../models/User');

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
  }
}