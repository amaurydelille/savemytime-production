import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { stripeCheckoutSessionEndpoint } from '../../utils/uris.tsx';
import './TransactionPage.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const TransactionPage = () => {
    const totalDict = {
        '1': 9.99,
        '2': 24.99,
        '3': 79.99
    }
    const { plan } = useParams();
    const [id, setId] = useState<string | undefined>('');
    const [token, setToken] = useState<string | undefined>('');
    const total = totalDict[plan!.toString()]
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkAuthentication = async () => {
        const cookieToken = await Cookies.get('token');
        const cookieId = await Cookies.get('id');
        setToken(cookieToken);
        setId(cookieId);
        if (token === undefined) navigate('/auth/signup')
    }

    useEffect(() => {
        checkAuthentication();
    }, [id, navigate]);

    const productsPrices = {
        1: 9.99,
        2: 24.99,
        3: 79.99
    };

    const MakePayment = async () => {
        const planNumber = parseInt(plan!);
        setLoading(true);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        try {
            const res = await axios.post(stripeCheckoutSessionEndpoint, {
                user_id: id,
                amount: productsPrices[planNumber],
            });
            setSession(res.data);
            setLoading(false);
            const result = await stripe.redirectToCheckout({
                sessionId: res.data.id,
            });

            if (result.error) {
                console.log(result.error.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const displayOffer = (plan) => {
        switch (plan) {
            case 'Classic':
                return (
                    <div className="offer-container">
                        <p className='offer-title'>Classic</p>
                        <p>• 50 searches</p>
                        <p>• 3 keywords by search</p>
                        <p>• Renewable</p>
                        <div className="promotion">
                            <p className='price'>9.99$</p>
                            <p className='old-price'>14.99$</p>
                        </div>
                    </div>
                );
            case 'Expert':
                return (
                    <div className="offer-container"
                        style={{
                            background: 'linear-gradient(225deg, rgba(211,217,83,1) 0%, rgba(251,142,88,1) 100%)'
                        }}
                    >
                        <p className='offer-title'
                            style={{
                                fontFamily: 'Playfair Display, serif'
                            }}
                        >Expert</p>
                        <p>• 150 searches</p>
                        <p>• 10 keywords by search</p>
                        <p>• Renewable</p>
                        <div className="promotion">
                            <p className='price'>24.99$</p>
                            <p className='old-price'>29.99$</p>
                        </div>
                    </div>
                );
            case 'Premium':
                return (
                    <div className="offer-container"
                        style={{
                            background: 'rgb(210,217,83)',
                            background: 'linear-gradient(225deg, rgba(210,217,83,1) 0%, rgba(255,122,227,1) 100%)'
                        }}
                    >
                        <p className='offer-title'
                            style={{
                                fontFamily: 'Playfair Display, serif'
                            }}
                        >Premium</p>
                        <p>• 300 searches</p>
                        <p>• 30 keywords by search</p>
                        <p>• Renewable</p>
                        <div className="promotion">
                            <p className='price'>79.99$</p>
                            <p className='old-price'>85.99$</p>
                        </div>
                    </div>
                );
            
        }
    };

    return (
        <div className="transaction-container">
            <p className='title'>Checkout</p>
            <div className="checkout-container">
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <Spin indicator={<LoadingOutlined spin />} size="large" spinning percent={100} />
                        <p style={{ color: 'white' }} >Redirecting to Stripe Payment Page</p>
                    </div>
                ) : (
                    <>
                        {displayOffer(plan)}
                        <div className="stripe-container">
                            <p>The total is {total}$</p>
                            <button onClick={() => MakePayment()}>
                                Go to Payment Page
                            </button>
                            <p>Powered by Stripe</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TransactionPage;
