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
  spacing: 4, // Adjust the spacing unit as needed (default is 8)
  overrides: {
    MuiContainer: {
      root: {
        display: 'flex',
        flexDirection: 'column', // Center children vertically
        justifyContent: 'center', // Center children horizontally
        alignItems: 'center', // Center children vertically
        height: '100vh', // Center content within the viewport
      },
    },
  },
});

export default theme;
