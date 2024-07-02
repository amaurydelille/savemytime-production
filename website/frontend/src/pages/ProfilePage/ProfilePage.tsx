import React, { useEffect, useState } from "react";
import './ProfilePage.css';
import { useAuth } from "../../contexts/UserAuthContext.tsx";
import axios from 'axios';
import { getUserEndpoint } from "../../utils/uris.tsx";
import {  
    EditOutlined
} from '@ant-design/icons'
import {
    message,
    Modal
} from 'antd';

const ProfilePage = () => {

    const [user, setUser] = useState({});
    const { id } = useAuth();

    const fetchUser = async () => {
        await axios
            .get(getUserEndpoint(id))
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const displayPlan = (plan) => {
        switch(plan) {
            case 'Unpaid':
                return (
                    <p 
                        style={{ color: "gray" }}
                    >No plan yet
                    </p>
                )
            case 1:
                return (
                    <div className="plan"
                        style={{
                            background: 'rgb(142,201,255)',
                            background: 'linear-gradient(225deg, rgba(142,201,255,1) 0%, rgba(255,143,143,1) 100%)'
                        }}
                    >
                        <p className="plan-text">Classic</p>
                        <p>50 searches</p>
                        <p>3 keywords per search</p>
                    </div>
                )
            case 'Classic':
                return (
                    <div className="plan"
                        style={{
                            background: 'rgb(211,215,126)',
                            background: 'linear-gradient(225deg, rgba(211,215,126,1) 0%, rgba(242,162,76,1) 100%)'
                        }}
                    >
                        <p className="plan-text">Premium</p>
                        <p>150 searches</p>
                        <p>10 keywords per search</p>
                    </div>
                )
        }
    }

    useEffect(() => {
        if (id)
            fetchUser();
    }, [id])

    return(
        <div className="profile-container">
            <div className="plan-container">
                <p className="title">My Plan</p>
                {displayPlan(user.plan)}
            </div>
        </div>
    );
}

export default ProfilePage;