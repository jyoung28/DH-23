import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';

const BottomNavBar = () => {
  const [value, setValue] = useState(0); // State to manage the selected navigation item

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the selected item when a navigation item is clicked
  };

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Camera" icon={<CameraAltIcon />} />
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
};

export default BottomNavBar;
