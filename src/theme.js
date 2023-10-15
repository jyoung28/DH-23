// theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize the theme here
  palette: {
    primary: {
      main: '#EE4B2B', // Set your primary color
    },
    secondary: {
      main: '#D2042D', // Set your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Set your preferred font
  },
  spacing: 8, // Set your preferred spacing unit
});

export default theme;
