import React, { useContext, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';
import runQuery from './SearchFood'
import {  makeStyles } from '@mui/styles';
import BottomNavbar from './bottomNavbar'
import logo from '../static/logosmall.png'
import OptionModal from './OptionModal';

const useStyles = makeStyles((theme) => ({
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
  marginTop: theme.spacing(2)
  },
  logo: {
    marginTop:'1rem',
    height: '2rem',
  },
}));
 
//'AIzaSyC80kUfA0WpiKxc8UtDy-CqqkBYDkK0xcg'
const CameraPage = ({ onSaveImage }) => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [capturing, setCapturing] = useState(true);
  const [food,setFood] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false); // Add state for the modal

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };


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
    // Replace with the actual image URIhttp://127.0.0.1:5000
    fetch('http://127.0.0.1:5000/vis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Image-URI': image,

      },mode: 'cors', // Enable CORS for the request
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from Flask API:', data);
        setFood(data.result)
        setModalOpen(true); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
 
  };
  const classes = useStyles();
  return (
    <div>
      <img src={logo} className={classes.logo}></img>
    <div className={classes.cameraContainer}>
      {capturing ? (
        <>
          <Webcam
            audio={false}
            style={{ height: '70vh', width: '400px' }}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            
          />
          
          <Button disableElevation onClick={capture} variant='contained'   className={classes.button}>Capture Photo</Button>
        </>
      ) : (
        <>
          <img src={image} alt="Captured" />
          <Button disableElevation variant='contained' onClick={retake}   className={classes.button}>Retake</Button>
          <Button disableElevation variant='contained' onClick={saveImage}   className={classes.button}>Submit</Button>
        </>
      )}
              <OptionModal
          options={food} // Pass the 'food' data to the modal
          open={isModalOpen} // Open the modal based on state
          onClose={handleModalClose} // Close the modal
          onSave={(selectedOption) => {
            // Handle selected option from the modal if needed
            console.log('Selected Option:', selectedOption);
            handleModalClose();
          }}
        />
      <BottomNavbar></BottomNavbar>
    </div></div>
  );
};

export default CameraPage;
