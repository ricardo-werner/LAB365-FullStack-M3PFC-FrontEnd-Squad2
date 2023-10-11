//import React, { useState } from 'react';
import './App.css';
import AppRouter from './Router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Box m={10}>
        <Button />
      </Box>

      <AppRouter />

    </div>
  )
}

export default App
