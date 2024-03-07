import { Route, Routes } from 'react-router'
import MainPage from '../components/MainPage';
import ForgotPassword from '../components/ForgotPassword';

export default function AppRoutes() {

    return(
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}