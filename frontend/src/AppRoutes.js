import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RoutesConfig from './RoutesConfig';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/user/landing/landingPage';
import GameIndex from './pages/user/game/GameIndex';
import GamePage from './pages/user/game/GamePage';
import DashboardGameLibrary from './pages/user/dashboard/dashboardGameLibrary';
import ReviewPage from './pages/user/review/ReviewPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/games" element={<GameIndex />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user_dashboard" element={<LandingPage />} />
            <Route path="/dashboard_game" element={<DashboardGameLibrary />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute element={<AdminLayout />} />
                }
            >
                {RoutesConfig.map(({ path, component: Component }, index) => (
                    <Route key={index} path={path} element={<Component />} />
                ))}
            </Route>
        </Routes>
    );
}

export default AppRoutes;
