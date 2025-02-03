import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function WelcomePage({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  // Handle form submission
    const handleLogin = (event) => {
        event.preventDefault();

        const storedUser = localStorage.getItem(username);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === password) {
                // User is authenticated, call onLogin from props
                onLogin(username);
                setError('');
            } else {
                setError('Incorrect password');
            }
        } else {
            setError('Username not found');
        }
    };

    return (
        <div>
        <h2>Please Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>  
        </form>

        <div id="registerSection">
            <p> Don't have an account? 
                <Link to="/register"><button>Sign Up</button></Link>
            </p>
        </div>

        <div id="welcomeText">
            <p> Buy and Sell games all from the convience of a single website.
                Make money from old games to buy the newest games!
                New users start with $50.00!
            </p>
        </div>
        
        </div>
    );
}
export default WelcomePage;