const { Schema, model } = require('mongoose');


const TagSchema = new Schema({
  nome: {
    type: String,
    required: true
  },

  list: [{
    type: Schema.Types.ObjectId, ref: 'List',
    required: true
  }],

  githubusers: [{
    type: Schema.Types.ObjectId, ref: 'GithubUser',
  }]
});

module.exports = model('Tag', TagSchema);