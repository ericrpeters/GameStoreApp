import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Check if username already exists in localStorage
        const existingUser = localStorage.getItem(username);
        if (existingUser) {
            setError('Username already exists!');
            return;
        }

        // Store the username and password in localStorage (in a real app, you'd use a backend)
        localStorage.setItem(username, JSON.stringify({ username, password }));

        // Call parent onRegister to update the login state
        onRegister(username);

        // Clear form fields and redirect to login page (or home)
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        navigate('/home');
    };

    const handleToWelcome = () => {
        navigate('/');  // Navigate back to the WelcomePage
    };

    return (
        <div>
            <h2>Create an Account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />

                <button type="submit">Register</button>
            </form>
            <div id="goBack">
                <button onClick={handleToWelcome}>Go Back</button>
            </div>
        </div>
    );
}

export default RegistrationPage;
