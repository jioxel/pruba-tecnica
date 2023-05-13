// import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#3a3a3a',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>,
)
