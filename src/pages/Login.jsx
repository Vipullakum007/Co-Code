import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinRoom.css';
import loginImg from '../assets/login.png';
import { useAuth } from '../store/auth';
import { toast } from'react-toastify';

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            console.log(response);

            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                toast.success('Login Successful !');
                storeTokenInLS(responseData.token);
                setUser({ email: "", password: "" });
                navigate('/room'); // Redirect to dashboard or desired page after login
            } else {
                toast.error("Login failed: " + responseData.message);
                console.log("Login failed: " + responseData.message);
                // Handle login failure (show error message, etc.)
            }
        } catch (error) {
            console.log("Login failed: " + error.message);
        }
    }

    return (
        <div className="section-auth">
            <div className="container grid grid-two-cols">
                <div className="section-auth-image">
                    <img src={loginImg} alt="Login" width={400} height={400} />
                </div>
                <div className="auth-form">
                    <h1 className="main-heading mb-3">Login</h1>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        id='email'
                        required
                        autoComplete='off'
                        value={user.email}
                        onChange={handleInput}
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        id='password'
                        required
                        autoComplete='off'
                        value={user.password}
                        onChange={handleInput}
                    />
                    <button onClick={handleLogin} className="section-auth-button">Login</button>
                </div>
            </div>
        </div>
    );
}
