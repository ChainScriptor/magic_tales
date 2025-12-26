const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Get all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single submission by ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new submission
router.post('/', async (req, res) => {
  try {
    const { characterName, characterDescription, characterAge, userEmail, uploadedImage, generatedImage } = req.body;
    
    const submission = new Submission({
      characterName,
      characterDescription,
      characterAge,
      userEmail,
      uploadedImage,
      generatedImage
    });

    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a submission
router.delete('/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

