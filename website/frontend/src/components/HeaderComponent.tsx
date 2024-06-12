import React, { useEffect, useState } from 'react';
import './HeaderComponent.css';
import { useAuth } from '../contexts/UserAuthContext.tsx';
import { UserOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

    const [resize, setResize] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const { token } = useAuth();
    const { id } = useAuth();

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 550) {
                setResize(true);
            } else {
                setResize(false);
                setShowMenu(false); 
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='header-container'>
            {resize && 
                <div className="hidden-container" onClick={handleShowMenu}>
                    <MenuOutlined className='menu-icon' />
                </div>
            }

            <div className="title-container">
                <a href='/'>SaveMyTime</a>
            </div>

            {!resize && 
            <>

                {token ? ( 
                    <div className="login-container">
                        <div className='link'
                            onClick={() => navigate(`/profile/${id}`)}
                        >
                            <UserOutlined />
                        </div>
                    </div>
                ) : (        
                    <div className="login-container">
                        <div className="link"
                            onClick={() => navigate('/auth/login')}
                        >
                            <UserOutlined />    
                            <a>Sign In</a>
                        </div>
                        <div className="link"
                            onClick={() => navigate('/auth/signup')}
                        >
                            <UserAddOutlined />
                            <a>Sign Up</a>
                        </div>
                    </div>
                )}
            </>}

            {showMenu &&
                <div className="hidden-menu show">
                    {token ? (
                        <div className='link'>
                            <p>Mon compte</p>
                            <UserOutlined />
                        </div>
                    ) : (
                    <>
                        <div className="link">
                            <UserOutlined />    
                            <a>Sign In</a>
                        </div>
                        <div className="link">
                            <UserAddOutlined />
                            <a>Sign Up</a>
                        </div>
                    </>
                )}
                </div>
            }
        </div>
    );
};

export default HeaderComponent;
