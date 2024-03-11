import { Route, Routes } from 'react-router'
import MainPage from '../components/Web/MainPage';
import ForgotPassword from '../components/Web/ForgotPassword';
import ImageSwiper from '../components/Web/ImageSwiper'
import Layout from '../components/Admin/Layout';
import Dashboard from '../components/Admin/Dashboard';
import Images from '../components/Admin/Images';
import AddSwipeOption from '../components/Admin/SwipeOptions/AddSwipeOption';
import EditSwipeOption from '../components/Admin/SwipeOptions/EditSwipeOption';
import SwipeOptions from '../components/Admin/SwipeOptions/SwipeOptions';

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/image-swiper" element={<ImageSwiper />} />
            {/* Admin routes start here */}
            <Route path="/web-admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="images" element={<Images />} />
                <Route path="swipe-options">
                    <Route index element={<SwipeOptions />} />
                    <Route path="add" element={<AddSwipeOption />} />
                    <Route path="edit/:id" element={<EditSwipeOption />} />
                </Route>
            </Route>
            <Route path='/web-admin/login' element={<div>This is the login page</div>} />
        </Routes>
    );
}