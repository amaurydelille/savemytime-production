import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../../contexts/UserAuthContext.tsx';
import axios from 'axios';
import { stripeCheckoutSessionEndpoint } from '../../utils/uris.tsx';
import './TransactionPage.css';
import { useNavigate } from 'react-router-dom';

const TransactionPage = () => {
    const { plan } = useParams();
    const total = plan?.toString() === '1' ? 9.99 : 24.99;
    const { id } = useAuth();
    const navigtate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (id === undefined) navigate('/auth')
    });

    const productsPrices = {
        1: 9.99,
        2: 24.99
    }

    const MakePayment = async (plan) => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        try {
            const res = await axios.post(stripeCheckoutSessionEndpoint, {
                user_id: id,
                amount: productsPrices[plan]
            });

            console.log(res);
            setSession(res.data);

            const result = await stripe.redirectToCheckout({
                sessionId: res.data.id
            });

            if (result.error) {
                console.log(result.error.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const displayOffer = (plan) => {
        if (plan === '1') {
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
        } else {
            return (
                <div className="offer-container"
                    style={{
                        background: 'rgb(211,217,83)',
                        background: 'linear-gradient(225deg, rgba(211,217,83,1) 0%, rgba(251,142,88,1) 100%)'
                    }}
                >
                    <p className='offer-title'
                        style={{
                            fontFamily: 'Playfair Display, serif'
                        }}
                    >Premium</p>
                    <p>• 150 searches</p>
                    <p>• 10 keywords by search</p>
                    <p>• Renewable</p>
                    <div className="promotion">
                        <p className='price'>24.99$</p>
                        <p className='old-price'>29.99$</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="transaction-container">
            <p className='title'>Checkout</p>
            <div className="checkout-container">
                {displayOffer(plan)}
                <div className="stripe-container">
                    <p>The total is {total}$</p>
                    <button onClick={() => MakePayment(parseInt(plan))}>
                        Go to Payment Page
                    </button>
                    <p>Powered by Stripe</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
