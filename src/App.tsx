import React from 'react';
import Sidebar from './component/Sidebar/Sidebar';
import { Box } from '@mui/material';
import HomePage from './component/ChatContent/ChatContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', }}>
        <Box sx={{ width: 'calc(100vw - 80vw)' ,}}>
          <Sidebar />
        </Box>
        <Box sx={{ width: 'calc(100vw - 20vw)',  p: 2 }}>
          <Routes>
            {/* <Route path="/" element={<HomePage />} />  */}
            <Route path="/user/:username" element={<HomePage />} /> 
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
