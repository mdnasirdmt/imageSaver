import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/ImagesDb', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Image uploaded:', response.data.imageUrl);
      setImageUrl(response.data.imageUrl); // Set the URL in state
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div className="App">
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>

      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
