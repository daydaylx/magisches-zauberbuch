import { createTheme } from '@mui/material/styles';

const immersiveTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1a1a',
      paper: '#2b2b2b'
    },
    primary: {
      main: '#ffcc00'
    },
    secondary: {
      main: '#009688'
    },
    text: {
      primary: '#fff',
      secondary: '#aaa'
    }
  },
  typography: {
    fontFamily: '"IM Fell DW Pica", serif',
    h4: {
      fontWeight: 600
    }
  }
});

export default immersiveTheme;
