// src/theme.ts
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode: 'dark', // Dark mode
      primary: {
        main: '#4CAF50',
      },
      secondary: {
        main: '#FF9800',
      },
      background: {
        default: '#262726',
        paper: '#313331',
      },
      text: {
        primary: '#F5F5F5',
        secondary: '#B0B0B0',
      },
    },
    components:
      {
        MuiAlert: {
          styleOverrides: {
            root: {
              backgroundColor: '#FF9800', // Use secondary color
              color:
                '#FFFFFF', // Adjust text color for dark mode
            }
            ,
            standardError: {
              backgroundColor: '#FF9800',
            }
            ,
          }
          ,
        }
        ,
        MuiButton: {
          styleOverrides: {
            contained: {
              color: '#262726'
            },
          }
        }
      }
    ,
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1:
        {
          fontSize: '1.5rem', fontWeight:
            500
        }
      , // Large titles
      h2: {
        fontSize: '1.25rem', fontWeight:
          500
      }
      , // Section titles
      h3: {
        fontSize: '1.125rem', fontWeight:
          500
      }
      , // Smaller section headers
      body1: {
        fontSize: '1rem', fontWeight:
          400
      }
      , // Normal text
      body2: {
        fontSize: '0.875rem', fontWeight:
          400
      }
      , // Secondary text
      button: {
        fontSize: '0.875rem', fontWeight:
          500, textTransform:
          'uppercase'
      }
      , // Button text
      caption: {
        fontSize: '0.75rem', fontWeight:
          400
      }
      , // Small captions
    }
  })
;


export default theme;
