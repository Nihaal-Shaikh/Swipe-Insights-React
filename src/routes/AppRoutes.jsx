import { Route, Routes } from 'react-router'
import MainPage from '../components/Web/MainPage';
import ForgotPassword from '../components/Web/ForgotPassword';
import ImageSwiper from '../components/Web/ImageSwiper';
import AdminMainPage from '../components/Admin/AdminMainPage';

export default function AppRoutes() {

    return(
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/web-admin" exact element={<AdminMainPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/image-swiper" element={<ImageSwiper />} />
        </Routes>
    );
}