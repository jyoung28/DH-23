import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';

const CameraPage = ({ onSaveImage }) => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [capturing, setCapturing] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setCapturing(false);
  };

  const retake = () => {
    setImage(null);
    setCapturing(true);
  };

  const saveImage = () => {
    // Save the image to local storage or Firebase here
    onSaveImage(image);
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
