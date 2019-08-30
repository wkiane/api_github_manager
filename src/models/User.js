const { Schema, model } = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  }
}, {
  timestamps: true,
});

UserSchema.pre('save', function(next){
  this.senha = bcrypt.hashSync(this.senha, saltRounds);
  next();
});  

module.exports = model('User', UserSchema);