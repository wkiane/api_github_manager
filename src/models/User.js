const { Schema, model } = require('mongoose');

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


module.exports = model('User', UserSchema);