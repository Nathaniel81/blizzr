import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider, createTheme } from '@mantine/core';


const myTheme = createTheme({
});


ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={myTheme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
);