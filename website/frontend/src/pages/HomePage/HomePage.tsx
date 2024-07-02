import React from 'react';
import './HomePage.css';
import { DownCircleOutlined, RocketTwoTone } from '@ant-design/icons';
import { Badge } from 'antd';
import PricingCard from '../../components/PricingCardComponent.tsx';

const HomePage = () => {

    const scrollToGifContainer = () => {
        const gifContainer = document.getElementById('gif-container');
        if (gifContainer) {
            gifContainer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='main-container'>
            <div className="presentation-container">
                <div className="text-container">
                    <p className='title'>SaveMyTime</p>
                    <p className='text'>The most efficient, accurate, and reliable text summarizer<br />in a Google Chrome extension.</p>
                    <a 
                        onClick={scrollToGifContainer}
                        className='button'
                    >
                        See Launch Promotion <RocketTwoTone style={{ fontSize: 20, marginLeft: 5 }} twoToneColor={'violet'} />
                    </a>
                </div>
                <DownCircleOutlined className='down-button' onClick={scrollToGifContainer}/>
            </div>

            <div id="gif-container" className="gif-container">
                <p className='title'>Start saving your time, work efficiently</p>
                <p className='text'>
                    Tired of long reading webpages and inaccurate text summarizer ?
                    With SaveMyTime, type keywords and get the summarized text.
                </p>
                <img
                    src={require('../../images/presentation-video.gif')}  alt=''  
                />
            </div>

            <div className="pricing-container">
                <p className='title' style={{ marginBottom: 20 }}>Plans and Pricing</p>
                <div className="offers-container">
                    <Badge.Ribbon text='-5$' color='blue'>
                        <PricingCard offerIndex={1} />
                    </Badge.Ribbon>
                    <Badge.Ribbon text='-5$' color='blue'>
                        <PricingCard offerIndex={2} />
                    </Badge.Ribbon>
                    <Badge.Ribbon text='-5$' color='blue'>
                        <PricingCard offerIndex={3} />
                    </Badge.Ribbon>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
