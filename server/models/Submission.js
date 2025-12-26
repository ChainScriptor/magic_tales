const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  characterName: {
    type: String,
    required: true
  },
  characterDescription: {
    type: String,
    default: null
  },
  characterAge: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  uploadedImage: {
    type: String, // base64 string
    default: null
  },
  generatedImage: {
    type: String, // base64 string or URL
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);

