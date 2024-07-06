import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const savedToken = Cookies.get('token');
        if (savedToken) {
            setToken(savedToken);
        }

        const savedId = Cookies.get('id');
        if (savedId) {
            setId(savedId);
        }
    }, []);

    const saveToken = (newToken) => {
        Cookies.set('token', newToken, { domain: process.env.REACT_APP_DOMAIN_COOKIES });
        setToken(newToken);
    };

    const saveId = (id) => {
        Cookies.set('id', id, { domain: process.env.REACT_APP_DOMAIN_COOKIES });
        setId(id);
    }

    return (
        <AuthContext.Provider value={{ token, setToken: saveToken, id, setId: saveId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
