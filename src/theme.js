// theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize the theme here
  palette: {
    primary: {
      main: '#D2042D', // Set your primary color
    },
    secondary: {
      main: '#EE4B2B', // Set your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Set your preferred font
  },
  spacing: 8, // Set your preferred spacing unit
});

export default theme;
