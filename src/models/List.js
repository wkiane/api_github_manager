const { Schema, model } = require('mongoose');

// const GithubUsers = require('./GithubUser');

const ListSchema = new Schema({
  nome: {
    type: String,
    required: true
  },

  tags: [{
    type: Schema.Types.ObjectId, ref: 'Tag',
  }],
  
  githubusers: [{
    type: Schema.Types.ObjectId, ref: 'GithubUser',
  }],

  user: {
    type: Schema.Types.ObjectId, ref: 'User',
  }
}, {
  timestamps: true,
});


module.exports = model('List', ListSchema);