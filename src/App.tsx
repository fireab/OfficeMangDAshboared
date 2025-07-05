import React from 'react';
// import { useLocation } from 'react-router-dom';
import './App.css';
import { CssBaseline} from '@mui/material';
import { ColorProvider } from './assets/theme/Theme.theme';
import AppRoutes from "./AppRoute";
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (

  <Router>
    <ToastContainer />
      <ColorProvider>
        <CssBaseline />
              <AppRoutes/>
      </ColorProvider>
  </Router>
  );
}
export default App;
