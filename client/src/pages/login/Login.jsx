import { redirect, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../untils/instance/axiosIntance';
import './Login.modules.scss';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState();
    console.log(user);
    const [userData, setUserData] = useState({});
    const [values, setValues] = useState('');
    const navigate = useNavigate();
    const onchange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const refreshToken = async () => {
        try {
            const res = await newAxiosIntance.post('/auth/refresh', { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    const getUser = async () => {
        try {
            const res = await newAxiosIntance.get('/users/' + user?._id, {
                headers: { authorization: 'Bearer ' + user.accessToken },
            });
            if (res.data.success === false) {
                console.log(res.data);
            } else {
                setUserData(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', { email: values.email, password: values.password });
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const newAxiosIntance = axios.create({
        baseURL: import.meta.env.VITE_URL_API,
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    
    newAxiosIntance.interceptors.request.use(
        async (config) => {
            // Làm gì đó trước khi request dược gửi đi
            let currentDate = new Date();
            const decodeToken = jwtDecode(user.accessToken);
            if (decodeToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers['authorization'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        function (error) {
            // Làm gì đó với lỗi request
            return Promise.reject(error);
        },
    );

    return (
        <>
            {!user ? (
                <div className="login">
                    <h1>Login</h1>
                    <input type="text" name="email" placeholder="email" className="login-input" onChange={onchange} />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        className="login-input"
                        onChange={onchange}
                    />
                    <button type="submit" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            ) : (
                <div className="info">
                    <button onClick={getUser}>GET INFO USER</button>
                    {userData ? <>{userData.email}</> : 'nothing'}
                </div>
            )}
        </>
    );
}

export default Login;
