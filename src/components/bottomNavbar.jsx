import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const BottomNavBar = () => {
  const [value, setValue] = useState(0); // State to manage the selected navigation item

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the selected item when a navigation item is clicked
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
      <BottomNavigation value={value} onChange={handleChange}>
        <Link to="/home">
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        </Link>
        <Link to="/search">
          <BottomNavigationAction label="Camera" icon={<CameraAltIcon />} />
        </Link>
        <Link to="/goal">
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </Link>
      </BottomNavigation>
    </div>
  );
};

export default BottomNavBar;
