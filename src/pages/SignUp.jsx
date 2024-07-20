import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinRoom.css';
import registerImg from '../assets/register.png';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
export default function SignUp() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
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
                toast.success('Registration Successful!');
                storeTokenInLS(responseData.token); 
                setUser({ username: "", email: "", password: "" });
                navigate('/login');
            } else {
                toast.error("Registration failed: " + responseData.message);
                console.log("Registration failed: " + responseData.message);
            }
        } catch (error) {
            toast.error("Registration failed: " + error.message);
            console.log("Registration failed: " + error);
        }
    }
    return (
        <div className="section-auth">
            <div className="container grid grid-two-cols">
                <div className="section-auth-image">
                    <img src={registerImg} alt="Sign Up" width={400} height={400} />
                </div>
                <div className="auth-form">
                    <h1 className="main-heading mb-3">Sign Up</h1>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username..."
                        id="username"
                        required
                        autoComplete="off"
                        value={user.username}
                        onChange={handleInput}
                    />
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
                    <button onClick={handleSignUp} className="section-auth-button">Sign Up</button>
                </div>
            </div>
        </div>
    );
}
