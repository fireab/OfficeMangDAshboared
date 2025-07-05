// ProtectedRoute.js
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface DashBoardMainLayout {
  children: ReactNode;
}

const ProtectedRoute: React.FC<DashBoardMainLayout> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login page if no token is found
    return <Navigate to="/" replace />;
  }

  // Render the requested component if token is present
  return <>{children}</>;
};

export default ProtectedRoute;
