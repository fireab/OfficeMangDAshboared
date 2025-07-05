import { Routes, Route } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/Dashboard.admin';
import AdminAccountPage from './pages/admin/AdminAccount.page';
import ComplimentPage from './pages/admin/Compliment.page';
import EmployeePage from './pages/admin/Employee.page';
import { ComplimentDetailPage } from './pages/admin/ComplimentDetail.page';
import { EmployeeDetailPage } from './pages/admin/EmployeeDetailPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import DashBoardMainLayout from './DashboardLayout';
import UserPage from './pages/admin/Users.page';
import UserDetailPage from './pages/user/UserDetail.page';
import RatePage from './pages/admin/Rate.page';
import FeedBackPage from './pages/feedback/FeedBackPage';
import FeedBackDetailPage from './pages/feedback/FeedBackdDetail';
import { ToastContainer } from "react-toastify";
import AudioList from './pages/feedback/SoundFeedBack';
function AppRoutes () {
    return (
            <Routes>
                
                <Route path="/" element={<LoginPage/>} />
                <Route path="/dashboard" element={
                     <ProtectedRoute>
                        <DashBoardMainLayout>
                            <AdminDashboardPage />
                        </DashBoardMainLayout> 
                    </ProtectedRoute>
                    
                 } />
                <Route path="/profile" element={
                    <ProtectedRoute><DashBoardMainLayout>
                        <AdminAccountPage/> 
                    </DashBoardMainLayout></ProtectedRoute>
                    
                     
                     } />
                <Route path="/compliment" element={
                    <ProtectedRoute><DashBoardMainLayout>
                        <ComplimentPage />
                    </DashBoardMainLayout></ProtectedRoute>
                    
                     } />
                <Route path="/compliment/:id" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <ComplimentDetailPage /> 
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                    } />
                <Route path="/user" element={
                    <ProtectedRoute><DashBoardMainLayout>
                        <UserPage /> 
                    </DashBoardMainLayout></ProtectedRoute>
                    
                    } />
                <Route path="/employee" element={
                    <ProtectedRoute><DashBoardMainLayout>
                        <EmployeePage />
                    </DashBoardMainLayout></ProtectedRoute>
                    
                    
                     } />
                <Route path="/employee/:id" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <EmployeeDetailPage />
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                     } />
                 <Route path="/rates" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <RatePage />
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                     } />
                <Route path="/feedbacks" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <FeedBackPage />
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                     } />
                <Route path="/feedbacks/:id" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <FeedBackDetailPage />
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                     } />
                     

                <Route path="/user/:id" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <UserDetailPage />
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                     } />
                <Route path="/audios" element={
                    <ProtectedRoute>
                        <DashBoardMainLayout>
                        <AudioList />
                    </DashBoardMainLayout>
                    </ProtectedRoute>
                    
                     } />
            </Routes>
    );
}

export default AppRoutes;