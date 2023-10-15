import React, { useContext, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';
import runQuery from './SearchFood'
import {  makeStyles } from '@mui/styles';
import BottomNavbar from './bottomNavbar'
const useStyles = makeStyles((theme) => ({
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));
 
//'AIzaSyC80kUfA0WpiKxc8UtDy-CqqkBYDkK0xcg'
const CameraPage = ({ onSaveImage }) => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [capturing, setCapturing] = useState(true);

const capture = () => {
  const imageSrc = webcamRef.current.getScreenshot();

  // Display the captured image
  // setImage(imageSrc);
  console.log(imageSrc)
  // Convert the base64 image to binary data
  const binaryData = atob(imageSrc.split(',')[1]);

  // Create a new Uint8Array from the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a blob from the Uint8Array with PNG format
  const blob = new Blob([uint8Array], { type: 'image/png' });

  // Create an object URL for the blob
  const objectURL = URL.createObjectURL(blob);

  setImage(imageSrc)
  console.log(objectURL)

  setCapturing(false);
};

  const retake = () => {
    setImage(null);
    setCapturing(true);
  };


  const saveImage = () => {
    // Save the image to local storage or Firebase here


    // Make a POST request to your Flask API here
    // Replace with the actual image URI
    fetch('http://127.0.0.1:5000/vis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Image-URI': image,
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
  const classes = useStyles();
  return (
    
    <div className={classes.cameraContainer}>
      {capturing ? (
        <>
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            
          />
          
          <Button onClick={capture}   className={classes.button}>Capture Photo</Button>
        </>
      ) : (
        <>
          <img src={image} alt="Captured" />
          <Button onClick={retake}   className={classes.button}>Retake</Button>
          <Button onClick={saveImage}   className={classes.button}>Submit</Button>
        </>
      )}
      <BottomNavbar></BottomNavbar>
    </div>
  );
};

export default CameraPage;
