const axios = require('axios');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {


  async store(req, res, next) {

    const { email, cpf, senha, isAdmin } = req.body
    
    const userExists = await User.findOne({ email : email })

    // se o usuario já existir pare aqui
    if(userExists) {
      return res.json({ status: 'erro',
                        "message": 'Usuário já existe'
                      })
    }

    User.create({ email: email, senha: senha, cpf: cpf, isAdmin: isAdmin }, function(err, result) {
      if(err) {
        next(err);
      } else {
        res.json({  status: "success",
                    message: "Usuário criado com sucesso",
                    data: null,
                })
      }
    });
  },

  async authenticate(req, res, next) {
    
    const { email, senha } = req.body
    
    User.findOne({ email }, function(err, userInfo) {
      if(err) {
        next(err);
      } else {
        if(bcrypt(compareSync(senha), userInfo.senha )) {
          const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), {
            expiresIn: '1h'
          });
          
          res.json({ status: "success", message: "user found", data: {user: userInfo, token: token
          }});
        } else {
          res.json({ status: "error", message: "Invalid email or password" })
        }
      }
    });
  }
}
