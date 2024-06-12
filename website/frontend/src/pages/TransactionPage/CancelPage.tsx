import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

const CancelPage = () => {

    return(
        <div className="cancel-container"
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
                <p style={{ color: 'red' }}>Your payment failed..</p>
                <CloseCircleOutlined style={{ color: 'red' }} />
            </div>
        </div>
    );

}

export default CancelPage;