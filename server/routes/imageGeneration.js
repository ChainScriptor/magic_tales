const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');

// Generate image with Stability AI - Transform child photo to wizard costume
router.post('/generate-wizard', async (req, res) => {
  try {
    const { imageBase64, characterName, characterAge } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      return res.status(500).json({ error: 'Stability API key not configured' });
    }

    // Convert base64 to buffer
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Create prompt for wizard transformation
    const prompt = `A magical ${characterAge || 'young'} child named ${characterName || 'the child'} wearing an elegant wizard costume: a pointed wizard hat with stars, flowing robes decorated with moons and stars, holding a glowing magical wand. The child has a joyful, magical expression. High quality, detailed, colorful, children's book illustration style, fantasy setting with sparkles and magic effects.`;

    // Use core endpoint with image-to-image mode
    // Documentation: https://platform.stability.ai/docs/api-reference
    // For image-to-image, we need multipart/form-data with init_image field
    try {
      const formData = new FormData();
      // Use 'init_image' field name (not 'image') for image-to-image mode
      formData.append('init_image', imageBuffer, {
        filename: 'child-photo.jpg',
        contentType: 'image/jpeg',
      });
      formData.append('prompt', prompt);
      formData.append('mode', 'image-to-image');
      formData.append('strength', '0.75'); // How much to transform (0-1), higher = more transformation
      formData.append('seed', Math.floor(Math.random() * 1000000));
      formData.append('output_format', 'png');
      formData.append('aspect_ratio', '1:1');

      console.log('🔄 Attempting image-to-image with core endpoint...');
      console.log('📤 Request URL: https://api.stability.ai/v2beta/stable-image/generate/core');
      console.log('📤 Request Mode: image-to-image');
      console.log('📤 Has init_image: true');
      
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/generate/core',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${STABILITY_API_KEY}`,
            'Accept': 'image/*', // API expects image/* or application/json, not image/png
            ...formData.getHeaders(), // This sets Content-Type: multipart/form-data with boundary
          },
          responseType: 'arraybuffer',
          timeout: 120000, // 120 seconds timeout for image generation
        }
      );

      console.log('✅ Stability AI Response Status:', response.status);
      console.log('✅ Response Headers:', response.headers);

      // Convert response to base64
      const imageBase64Result = Buffer.from(response.data).toString('base64');
      const imageDataUrl = `data:image/png;base64,${imageBase64Result}`;

      res.json({ 
        success: true, 
        image: imageDataUrl 
      });

    } catch (img2imgError) {
      console.error('❌ Image-to-image Error Status:', img2imgError.response?.status);
      console.error('❌ Image-to-image Error Data:', img2imgError.response?.data);
      console.error('❌ Image-to-image Error Message:', img2imgError.message);
      
      // Log detailed error for debugging
      if (img2imgError.response) {
        console.error('❌ Response Status:', img2imgError.response.status);
        console.error('❌ Response Data:', img2imgError.response.data);
        if (img2imgError.response.data && typeof img2imgError.response.data === 'object') {
          try {
            const errorData = Buffer.from(img2imgError.response.data).toString('utf-8');
            console.error('❌ Response Data (parsed):', errorData);
          } catch (e) {
            console.error('❌ Response Data (raw):', img2imgError.response.data);
          }
        }
      }
      
      console.log('🔄 Falling back to text-to-image with enhanced prompt...');
      
      // Fallback: Use text-to-image with detailed prompt
      // Using the correct v2beta endpoint for text-to-image
      const enhancedPrompt = `${prompt} The child's face should match the uploaded photo.`;
      
      console.log('🔄 Falling back to text-to-image mode...');
      console.log('📤 Request URL: https://api.stability.ai/v2beta/stable-image/generate/core');
      console.log('📤 Request Mode: text-to-image');
      
      try {
        // Text-to-image also requires multipart/form-data (not JSON!)
        const textToImageFormData = new FormData();
        textToImageFormData.append('prompt', enhancedPrompt);
        textToImageFormData.append('output_format', 'png');
        textToImageFormData.append('mode', 'text-to-image');
        textToImageFormData.append('seed', Math.floor(Math.random() * 1000000));
        textToImageFormData.append('aspect_ratio', '1:1');

        const textToImageResponse = await axios.post(
          'https://api.stability.ai/v2beta/stable-image/generate/core',
          textToImageFormData,
          {
            headers: {
              'Authorization': `Bearer ${STABILITY_API_KEY}`,
              'Accept': 'image/*', // API expects image/* or application/json
              ...textToImageFormData.getHeaders(), // This sets Content-Type: multipart/form-data with boundary
            },
            responseType: 'arraybuffer',
            timeout: 120000,
          }
        );

        console.log('✅ Text-to-image Response Status:', textToImageResponse.status);

        const imageBase64Result = Buffer.from(textToImageResponse.data).toString('base64');
        const imageDataUrl = `data:image/png;base64,${imageBase64Result}`;

        res.json({ 
          success: true, 
          image: imageDataUrl 
        });
      } catch (textToImageError) {
        console.error('❌ Text-to-image Error Status:', textToImageError.response?.status);
        console.error('❌ Text-to-image Error Data:', textToImageError.response?.data);
        console.error('❌ Text-to-image Error Message:', textToImageError.message);
        throw textToImageError;
      }
    }

  } catch (error) {
    console.error('❌ Stability AI Final Error Status:', error.response?.status);
    console.error('❌ Stability AI Final Error Headers:', error.response?.headers);
    console.error('❌ Stability AI Final Error Data:', error.response?.data);
    console.error('❌ Stability AI Final Error Message:', error.message);
    console.error('❌ Full Error Object:', JSON.stringify(error.response?.data || error.message, null, 2));
    
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

