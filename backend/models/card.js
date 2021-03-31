const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[a-z0-9]+[a-z0-9\-._~:/?#%[\]@!$&'()*+,;=]*#?$/i;
        return regex.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
