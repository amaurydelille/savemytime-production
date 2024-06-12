import React from 'react';
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent.tsx";
import { AuthProvider } from '../contexts/UserAuthContext.tsx';
import FooterComponent from '../components/FooterComponent.tsx';
import './DefaultLayout.css';

const DefaultLayout = () => {
    return(
        <main>
            <AuthProvider>
                <HeaderComponent />
                <Outlet />
                <FooterComponent />
            </AuthProvider>
        </main>
    );
}

export default DefaultLayout;