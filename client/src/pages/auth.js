import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
// Button
const isLoggedIn = window.localStorage.getItem('userId');

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);

    const toggleIsLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth">
            {isLogin ? (
                <Login toggleIsLogin={toggleIsLogin} />
            ) : (
                <Register toggleIsLogin={toggleIsLogin} />
            )}
        </div>
    );
};

const Login = ({ toggleIsLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [_, setCookies] = useCookies(['access_token']);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password,
            });

            setCookies('access_token', response.data.token);
            window.localStorage.setItem('userId', response.data.userId);
            navigate('/');
        } catch (err) {
            console.error('this is an error:', err);
        }
    };
    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
            toggleIsLogin={toggleIsLogin}
        />
    );
};

const Register = ({ toggleIsLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/auth/register', {
                username,
                password,
            });
            alert('You have registered successfully!');
            toggleIsLogin();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <Form
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                label="SignUp"
                onSubmit={onSubmit}
                toggleIsLogin={toggleIsLogin}
            />
            Already have an account?
            Then{' '}
            <Button variant="contained" type="button" onClick={toggleIsLogin}>
                Login
            </Button>
        </div>
    );
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2 className='auth-form-lable'>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label><br />
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        helperText=" "
                        id="demo-helper-text-aligned-no-helper"
                        label="Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label><br />
                    <TextField
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText=" "
                        id="demo-helper-text-aligned-no-helper"
                        label="Password"
                    />
                </div>
                <Button variant="contained" type='submit'>{label}</Button>
            </form>
        </div>
    )
}