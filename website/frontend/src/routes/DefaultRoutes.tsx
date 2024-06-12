import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout.tsx';
import HomePage from '../pages/HomePage/HomePage.tsx';
import AuthPage from '../pages/AuthPage/AuthPage.tsx';
import SignUpPage from '../pages/SignUpPage/SignUpPage.tsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage.tsx';
import TransactionPage from '../pages/TransactionPage/TransactionPage.tsx';
import Payment from '../components/Payment.tsx';
import Success from '../pages/TransactionPage/SuccessPage.tsx';
import SuccessPage from '../pages/TransactionPage/SuccessPage.tsx';
import CancelPage from '../pages/TransactionPage/CancelPage.tsx';

const DefaultRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth/login' element={<AuthPage />} />
                <Route path='/auth/signup' element={<SignUpPage/>} />
                <Route path='/profile/:id' element={<ProfilePage/>} />
                <Route path='/checkout/:plan' element={<TransactionPage/>} />
                <Route path='/success' element={<SuccessPage/>} />
                <Route path='/cancel' element={<CancelPage/>} />
            </Route>
        </Routes>
    )
}

export default DefaultRoutes;