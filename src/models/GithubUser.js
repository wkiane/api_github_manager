const { Schema, model } = require('mongoose');

const GihubUserSchema = new Schema({

  login: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  localidade: {
    type: String,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
  lists: [{
    type: Schema.Types.ObjectId, ref: 'List',
  }]

}, {
  timestamps: true,
});


module.exports = model('GithubUser', GihubUserSchema);