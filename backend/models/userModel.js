const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
  birthdate: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  adresse: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    trim: true
  },
  categorie: {
    type: String
  },
  sous_categorie: {
    type: String
  },
  description: {
    type: String
  },
  site_web: {
    type: String
  },
  ville: {
    type: String, 
    default: "Fianarantsoa"
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
  ]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;