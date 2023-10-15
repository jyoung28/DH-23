import React, { useState } from 'react';
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
    setImage(imageSrc);
    const user_data = await getDoc(doc(db, "users", user));
    await setDoc(doc(db, "users", user), {
      goal:user_data.data().goal,
      gain: user_data.data().gain,
      totalToday : user_data.data().totalToday,
      img : imageSrc,
    });

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
