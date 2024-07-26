import React, { useEffect, useState } from "react";
import { message } from 'antd';
import './AuthPage.css';
import { SmileOutlined } from "@ant-design/icons";
import { authEndpoint } from "../../utils/uris.tsx";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserAuthContext.tsx";

const AuthPage = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ redirect, setRedirect ] = useState(false);
    const { setToken } = useAuth();
    const { setId } = useAuth();
    const navigate = useNavigate();

    const fetchAuth = async () => {
        await axios
            .post(authEndpoint, {
                credentials: {
                    email: email,
                    password: password
                }
            })
            .then(async (res) => {
                message.success(res.data.message);
                const token = res.data.token;
                const id = res.data.id;
                await setToken(token);
                await setId(id);
                setRedirect(true);
            })
            .catch((e) => {
                message.error(e.response.data.message);
            })
    }

    const handleSubmit = async () => {
        fetchAuth();
    }

    useEffect(() => {
        if (redirect) navigate('/');
    }, [redirect])

    return(
            <div className="auth-container">
                <form>
                    <p className="title">Welcome again <SmileOutlined size={20}/></p>
                    <div className="field">
                        <p>Email</p>
                        <input 
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <p>Password</p>
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-submit"
                        onClick={handleSubmit}
                    >
                        <p style={{
                            color: 'rgb(216, 158, 221)'
                        }}>
                            Sign In
                        </p>
                    </div>
                </form>
            </div>
    );

}

export default AuthPage;