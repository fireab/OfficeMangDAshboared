import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Sidebar from './shared/Sidebar/Sidebar';
import NavBar from './shared/Navbar/Navbar';

interface DashBoardMainLayout {
  children: ReactNode;
}
const DashBoardMainLayout:React.FC<DashBoardMainLayout> = ({children}) => {
  return (
    <>
        <NavBar />
        <div className='container' > 
            <Box className="side-bar-container">
                <Sidebar/>
            </Box>
            <Box className="main-container">
            {children}
            </Box>
        </div>
    </>
  );
};

export default DashBoardMainLayout;
