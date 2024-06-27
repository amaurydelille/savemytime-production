import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './SignUpPage.css';
import { SmileOutlined } from "@ant-design/icons";
import axios from 'axios';
import { signUpEndpoint } from "../../utils/uris.tsx"; 
import Cookies from 'js-cookie';
import { useAuth } from "../../contexts/UserAuthContext.tsx";
 
const SignUpPage = () => {

    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validEmail, setValidEmail ] = useState(false);
    const [ validPassword, setValidPassword ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    const { setToken } = useAuth();
    const { setId } = useAuth();

    const checkEmail = (email:string) => {
        if (!email.includes('@') || !email.includes('.') || email.lastIndexOf('.') < email.indexOf('@') + 2) {
            message.warning('Please enter a valid email address.');
            setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    }

    const checkPassword = (password:string) => {
        if (password.length < 6) {
            setValidPassword(false);
            message.warning('Please enter a valid password.')
        } else {
            setValidPassword(true);
        }
    }

    const handleSubmit = () => {
        if (!validEmail || !validPassword) message.error('Email or password are invalid.')
        else {
            fetchSubmit()
        }
    }

    useEffect(() => {
        if (redirect) navigate('/');
    })

    const fetchSubmit = async () => {
        await axios
            .post(signUpEndpoint, {
                user: {
                    email: email,
                    password: password
                }
            })
            .then((res) => {
                message.success(res.data.message);
                const token = res.data.token;
                const id = res.data.id;
                setToken(token);
                setId(id);
                setRedirect(true);
            })
            .catch((e) => {
                message.error(e.response.data.message);
            })

    }

    return(
            <div className="auth-container">
                <form>
                    <div className="field">
                    <p className="title">Welcome <SmileOutlined size={20}/></p>
                        <p>Email</p>
                        <input 
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => checkEmail(email)}
                        />
                    </div>
                    <div className="field">
                        <p>Password</p>
                        <input
                        type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => checkPassword(password)}
                        />
                    </div>
                    <div className="button"
                        onClick={handleSubmit}
                    >
                        <p style={{
                            color: 'rgb(216, 158, 221)'
                        }}
                            className="button-text"
                        >
                            Sign Up
                        </p>
                    </div>
                </form>
            </div>
    );

}

export default SignUpPage;