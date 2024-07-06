import React from 'react';
import { XOutlined } from '@ant-design/icons';
import './FooterComponent.css';

const FooterComponent = () => {

    return(
        <div className="footer-container">
            <p className='footer-title'>SaveMyTime 2024</p>
            <a href='https://x.com/savemytime_app'><XOutlined style={{ marginRight: 3 }}/> Join us on X</a>
            <a href='#'>Support us on ProductHunt</a>

        </div>
    );

}

export default FooterComponent;