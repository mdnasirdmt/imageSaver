// server.js
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const Image = require('./models/Image');
const cloudinary = require('cloudinary').v2;
// const cors = require('cors');


// // // Enable CORS for all routes
// app.use(cors());

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your Cloudinary configuration here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Define your API routes here
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = uploadResult.secure_url;
  
    // Save the URL to MongoDB using Mongoose
    const newImage = new Image({ url: imageUrl });
    await newImage.save();
  
    res.status(201).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Image upload or saving failed' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
