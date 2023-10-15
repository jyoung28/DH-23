import React, { useContext, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';
import fetchLabelsFromImage from './vision'
//'AIzaSyC80kUfA0WpiKxc8UtDy-CqqkBYDkK0xcg'
const CameraPage = ({ onSaveImage }) => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [capturing, setCapturing] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
     // Convert the base64 JPEG image to binary data
     const binaryData = atob(screenshot.split(',')[1]);

     // Create a new Uint8Array from the binary data
     const uint8Array = new Uint8Array(binaryData.length);
     for (let i = 0; i < binaryData.length; i++) {
       uint8Array[i] = binaryData.charCodeAt(i);
     }

     // Create a blob from the Uint8Array
     const blob = new Blob([uint8Array], { type: 'image/jpeg' });

     // Use a FileReader to convert the blob to a data URL with PNG format
     const reader = new FileReader();
     reader.onload = () => {
       const pngScreenshot = reader.result;

       // Now, `pngScreenshot` contains the screenshot in PNG format
       // You can display it or save it as needed
       console.log('PNG Screenshot:', pngScreenshot);
     };
     reader.readAsDataURL(blob);
     setImage(pngScreenshot)
    setCapturing(false);
  };

  const retake = () => {
    setImage(null);
    setCapturing(true);
  };


  const saveImage = () => {
    // Save the image to local storage or Firebase here
    console.log(image);

    // Make a POST request to your Flask API here
    const imageUri = image; // Replace with the actual image URI
    fetch('http://127.0.0.1:5000/vis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Image-URI': imageUri,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from Flask API:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {capturing ? (
        <>
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <Button onClick={capture}>Capture Photo</Button>
        </>
      ) : (
        <>
          <img src={image} alt="Captured" />
          <Button onClick={retake}>Retake</Button>
          <Button onClick={saveImage}>Submit</Button>
        </>
      )}
    </div>
  );
};

export default CameraPage;
