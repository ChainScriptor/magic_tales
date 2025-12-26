const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Replicate = require('replicate');
const axios = require('axios');

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/temp');
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter - only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Face swap route
router.post('/face-swap', upload.single('photo'), async (req, res) => {
  let uploadedFilePath = null;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No photo file uploaded. Please use field name "photo".' });
    }

    uploadedFilePath = req.file.path;
    console.log('📤 Uploaded file:', uploadedFilePath);

    // Check Replicate API token
    const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
    if (!REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'Replicate API token not configured' });
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });

    // Load wizard body template
    let wizardBodyPath = path.join(__dirname, '../../public/bodies/wizard.png');
    
    if (!fs.existsSync(wizardBodyPath)) {
      // Try alternative name
      const wizardBodyPathAlt = path.join(__dirname, '../../public/bodies/wizard-1.png');
      if (fs.existsSync(wizardBodyPathAlt)) {
        wizardBodyPath = wizardBodyPathAlt;
      } else {
        return res.status(500).json({ error: 'Wizard body template not found. Expected: public/bodies/wizard.png or wizard-1.png' });
      }
    }

    console.log('🎭 Wizard body template:', wizardBodyPath);

    // Convert files to data URLs or file streams for Replicate
    // Replicate accepts file paths, URLs, or data URLs
    
    // Read the uploaded photo and convert to base64 data URL
    const uploadedPhotoBuffer = fs.readFileSync(uploadedFilePath);
    const uploadedPhotoBase64 = uploadedPhotoBuffer.toString('base64');
    const uploadedPhotoDataUrl = `data:${req.file.mimetype};base64,${uploadedPhotoBase64}`;

    // Read wizard body and convert to base64 data URL
    const wizardBodyBuffer = fs.readFileSync(wizardBodyPath);
    const wizardBodyBase64 = wizardBodyBuffer.toString('base64');
    const wizardBodyDataUrl = `data:image/png;base64,${wizardBodyBase64}`;

    console.log('🔄 Calling Replicate face-swap model...');
    console.log('📤 Source image (child photo):', uploadedPhotoDataUrl.substring(0, 50) + '...');
    console.log('📤 Target image (wizard body):', wizardBodyDataUrl.substring(0, 50) + '...');

    // Use Replicate face-swap model: cdingram/face-swap
    // Model documentation: https://replicate.com/cdingram/face-swap
    // Input fields:
    //   - swap_image: The face to swap FROM (child's photo)
    //   - input_image: The image to swap INTO (wizard body template)
    const FACE_SWAP_MODEL = "cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111";
    
    console.log(`🔄 Using model: ${FACE_SWAP_MODEL}`);
    console.log('📤 swap_image (child face):', uploadedPhotoDataUrl.substring(0, 50) + '...');
    console.log('📤 input_image (wizard body):', wizardBodyDataUrl.substring(0, 50) + '...');
    
    const output = await replicate.run(
      FACE_SWAP_MODEL,
      {
        input: {
          swap_image: uploadedPhotoDataUrl,  // Child's face (source - the face to swap FROM)
          input_image: wizardBodyDataUrl,     // Wizard body template (target - the image to swap INTO)
        }
      }
    );

    console.log('✅ Replicate API Response:', output);
    console.log('✅ Output type:', typeof output);
    console.log('✅ Output constructor:', output?.constructor?.name);

    // Replicate returns a File object for this model
    // The File object has a .url() method to get the URL
    let resultImageUrl;
    let resultImageBuffer;
    
    if (output && typeof output.url === 'function') {
      // It's a File object with .url() method
      resultImageUrl = output.url();
      console.log('✅ Got File object, URL:', resultImageUrl);
      
      // Get the buffer from the File object
      resultImageBuffer = Buffer.from(await output.arrayBuffer());
    } else if (typeof output === 'string') {
      // It's a direct URL string
      resultImageUrl = output;
      console.log('✅ Got URL string:', resultImageUrl);
      
      // Download the image
      const imageResponse = await axios.get(resultImageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000,
      });
      resultImageBuffer = Buffer.from(imageResponse.data);
    } else if (Buffer.isBuffer(output)) {
      // It's already a buffer
      resultImageBuffer = output;
      console.log('✅ Got Buffer directly');
    } else if (Array.isArray(output)) {
      // It's an array (shouldn't happen with this model, but handle it)
      resultImageUrl = output[0];
      const imageResponse = await axios.get(resultImageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000,
      });
      resultImageBuffer = Buffer.from(imageResponse.data);
    } else {
      throw new Error(`Unexpected output format from Replicate: ${typeof output}`);
    }

    // Convert buffer to base64
    const imageBase64 = resultImageBuffer.toString('base64');
    const imageDataUrl = `data:image/png;base64,${imageBase64}`;

    console.log('✅ Face-swap completed successfully');

    // Clean up uploaded file
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath);
      console.log('🧹 Cleaned up temporary file:', uploadedFilePath);
    }

    res.json({
      success: true,
      image: imageDataUrl,
      url: resultImageUrl // Also return the Replicate URL if needed
    });

  } catch (error) {
    console.error('❌ Face-swap Error:', error);
    console.error('❌ Error Message:', error.message);
    console.error('❌ Error Stack:', error.stack);

    // Clean up uploaded file on error
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
        console.log('🧹 Cleaned up temporary file after error:', uploadedFilePath);
      } catch (cleanupError) {
        console.error('⚠️ Failed to cleanup file:', cleanupError);
      }
    }

    const statusCode = error.response?.status || 500;
    const errorMessage = error.message || 'Unknown error occurred';

    res.status(statusCode).json({
      error: 'Face-swap failed',
      message: errorMessage,
      details: error.response?.data || error.toString()
    });
  }
});

module.exports = router;

