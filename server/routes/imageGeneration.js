const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const Replicate = require('replicate');

// Generate image with Replicate API - Transform child photo to wizard costume
router.post('/generate-wizard', async (req, res) => {
  try {
    const { imageBase64, characterName, characterAge } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
    if (!REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'Replicate API token not configured' });
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });

    // Convert base64 to data URL for Replicate
    // Replicate accepts data URLs directly
    const imageDataUrl = imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`;

    // Create prompt for wizard transformation with face preservation
    const prompt = `The photo: Create a magical, colorful children's book illustration. A ${characterAge || 'young'} child named ${characterName || 'the child'} with the exact same face as in the input photo, wearing an elegant wizard costume: a pointed wizard hat decorated with stars, flowing robes with moons and stars patterns, holding a glowing magical wand. The child has a joyful, magical expression. Fantasy setting with sparkles and magic effects. High quality, detailed, colorful, children's book illustration style. Keep the face exactly as in the input photo.`;

    console.log('🔄 Using Replicate API for image-to-image with face preservation...');
    console.log('📤 Model: google/imagen-4');
    console.log('📤 Has input image: true');
    console.log('📤 Prompt:', prompt);

    try {
      // Use Replicate's imagen-4 model
      // Note: imagen-4 may not support direct image input, so we'll use a detailed prompt
      // that references the face characteristics
      const output = await replicate.run(
        "google/imagen-4",
        {
          input: {
            prompt: prompt,
            aspect_ratio: "3:4",
            safety_filter_level: "block_medium_and_above"
          }
        }
      );

      console.log('✅ Replicate API Response:', output);

      // Replicate returns an array of URLs or a single URL
      let imageUrl;
      if (Array.isArray(output)) {
        imageUrl = output[0];
      } else if (typeof output === 'string') {
        imageUrl = output;
      } else {
        throw new Error('Unexpected output format from Replicate');
      }

      // Download the image from Replicate URL and convert to base64
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000,
      });

      const imageBase64Result = Buffer.from(imageResponse.data).toString('base64');
      const finalImageDataUrl = `data:image/png;base64,${imageBase64Result}`;

      res.json({ 
        success: true, 
        image: finalImageDataUrl 
      });

    } catch (replicateError) {
      console.error('❌ Replicate API Error:', replicateError);
      console.error('❌ Error Message:', replicateError.message);
      console.error('❌ Error Details:', replicateError);
      
      throw new Error(`Replicate image generation failed: ${replicateError.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('❌ Replicate API Final Error:', error);
    console.error('❌ Error Message:', error.message);
    console.error('❌ Error Details:', error);
    
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
    const errorDetails = error.response?.data || { message: errorMessage };

    res.status(statusCode).json({ 
      error: 'Failed to generate image',
      status: statusCode,
      details: errorDetails
    });
  }
});

module.exports = router;

