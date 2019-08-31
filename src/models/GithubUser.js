const { Schema, model } = require('mongoose');

const GihubUserSchema = new Schema({

  login: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
  },
  bio: {
    type: String,
  },
  localidade: {
    type: String,
  },
  html_url: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  lists: [{
    type: Schema.Types.ObjectId, ref: 'List',
  }]

}, {
  timestamps: true,
});


module.exports = model('GithubUser', GihubUserSchema);