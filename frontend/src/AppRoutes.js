import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RoutesConfig from './RoutesConfig';
import AdminLayout from './layouts/AdminLayout';

function AppRoutes() {
    return (
        <Routes>
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
