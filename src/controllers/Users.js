const axios = require('axios');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var { check } = require('express-validator');
var { trata_cpf } = require('../helpers/user_helpers');


const saltRounds = 10;



const User = require('../models/User');

module.exports = {

  async index(req, res) {
    const { user } = req.headers;

    const users = await User.find({
      _id: { $ne: user }
    })

    return res.json(users);
  },

  async store(req, res) {

    const { email, cpf, senha, isAdmin } = req.body
    
    const userExists = await User.findOne({ email : email })

    // se o usuario já existir pare aqui
    if(userExists) {
      return res.json({ status: 'erro',
                        message: 'Usuário já existe'
                      })
    }

    if(!check(email).isEmail()) {
      return res.json({ status: "error", message: 'E-mail inválido' })
    }

    if(!check(senha).isLength({ min: 6 })) {
      return res.json({ status: "error", message: "Senha deve ter pelo menos 6 caracteres" })
    }

    if(trata_cpf(cpf).length !== 11) {
      return res.json({ status: "error", message: "CPF inválido" });
    }

    bcrypt.hash(senha, saltRounds, async function(err, hash) {
      
      await User.create({ email: email, senha: hash, cpf: cpf, isAdmin: isAdmin }, function(err, result) {
        if(err) {
          return res.json({ status: "error", message: err})
        }
        
        res.json({  status: "success",
                      message: "Usuário criado com sucesso",
                      data: null,
                })
      });
    
    });
  },

  async authenticate(req, res) {
    
    const { email, senha } = req.body
    
    User.findOne({ email }, async function(err, userInfo) {
      if(err) {
        next(err);
        return res.json({ status: "error", message: err})
      } else {
        const match = await bcrypt.compare(senha, userInfo.senha);

        if(match) {
          //login
          const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), {
            expiresIn: '1h'
          });
            
          res.json({
                    status: "success",
                    message: "user found",
                    data: {user: userInfo, token: token }
                  });
        } else {
          res.json({ status: "error", message: "Invalid email or password" })
        }
      }
    });
  }
}


/*
UserSchema.pre('save', function(next){
  this.senha = bcrypt.hashSync(this.senha, saltRounds);
  next();
});  


*/