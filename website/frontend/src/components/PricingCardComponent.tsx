import './PricingCardComponent.css'
import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

type PricingCardProps = {
    offerIndex: number
} 

const offerInfo = [
    {
        title: 'Classic',
        description: 'For quick searches with few details',
        price: 9.99,
        includes: [
            '50 searches',
        ]
    },
    {
        title: 'Expert',
        tag: 'Most popular',
        description: 'For deep and accurate searches with a lot of details',
        price: 24.99,
        includes: [
            '150 searches',
        ]
    },
    {
        title: 'Premium',
        description: 'For deep and accurate searches with a lot of details',
        price: 79.99,
        includes: [
            '500 searches',
            'PDF files (soon)'
        ]
    },
]

const PricingCard = ({ offerIndex }: PricingCardProps) => {

    const offer = offerInfo[offerIndex-1];

    return (
        <div className="card-container">
            <div className="pricing-header-container">
                <p className="pricing-title">{offer.title}</p>
                <p className="description">{offer.description}</p>
            </div>

            <div className="pricing-container">
                <div className="price">
                    <p>${offer.price}</p>
                    <p className='promo'>{offer.price + 5}</p>
                </div>
                <a href={`/checkout/${offerIndex}`}>Get Started</a>
                <div className="including-container">
                    <p className='pricing-title'>What's included</p>
                    {offer.includes.map((include, index) => (
                        <p><CheckOutlined /> {include}</p>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default PricingCard;