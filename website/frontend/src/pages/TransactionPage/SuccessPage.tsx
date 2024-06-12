import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

const SuccessPage = () => {

    return(
        <div className="success-container"
            style={{
                height: '75vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="message-container"
                style={{
                    textAlign: 'center',
                    padding: 10,
                    backgroundColor: 'whitesmoke',
                    borderRadius: 10
                }}
            >
                <p style={{ color: 'green' }}>Payment made successfully</p>
                <CheckCircleOutlined style={{ color: 'green' }} />
                <p>Now install the extension from the <a
                    href='https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar&hl=us'
                    style={{
                        color: 'blue'
                    }}
                >
                    Chrome Web Store
                    </a>
                </p>
            </div>
        </div>
    );

}

export default SuccessPage;