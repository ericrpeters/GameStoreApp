// Import dependencies
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import pages:
import WelcomePage from './pages/WelcomePage.js'
import HomePage from './pages/HomePage.js';
import RegistrationPage from './pages/RegistrationPage.js';
import AccountPage from './pages/AccountPage.js';
import BuyPage from './pages/BuyPage.js';
import SellPage from './pages/SellPage.js';
import AboutPage from './pages/AboutPage.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        const storedUser = localStorage.getItem('currentUser');
        if (storedLoginState === 'true' && storedUser) {
          setIsLoggedIn(true);
          setCurrentUser(storedUser);
        }
      }, []);

    const handleLogin = (username) => {
        const userData = { userName: username };
        const existingWallet = localStorage.getItem(`wallet_${username}`);
        const walletAmount = existingWallet ? parseFloat(existingWallet) : 50;

        setIsLoggedIn(true);
        setCurrentUser(username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem(`wallet_${username}`, walletAmount.toFixed(2));

        window.location.href = '/home';
    };

    const handleLogout = () => {
        const userDataString = localStorage.getItem('currentUser'); // Get stored user data

        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);  
                if (userData && userData.userName) {
                    localStorage.removeItem(`cart_${userData.userName}`); 
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    };

    return (
        <div>
            <BrowserRouter>

                <header>
                    <h2>Welcome to</h2>
                    <h1>My Game Store</h1>
                    <p>Buy and Sell Your Favorite Games!</p>
                </header>

                {isLoggedIn && <Navigation onLogout = {handleLogout}/>}

                <main>
                    <section>
                        <article>
                            <Routes> 
                                {/* Add Routes for Pages.  */}
                                <Route path="/" element={<WelcomePage onLogin={handleLogin}/>}/> 
                                <Route path="/register" element={<RegistrationPage onRegister={handleLogin} />} />
                                <Route path="/home" element={<HomePage username={currentUser}/>}/>
                                <Route path="/account" element={<AccountPage username={currentUser}/>}/>
                                <Route path="/buy" element={<BuyPage username={currentUser}/>}/>
                                <Route path="/sell" element={<SellPage username={currentUser}/>}/>
                                <Route path="/about" element={<AboutPage username={currentUser}/>}/>
                            </Routes>
                        </article>
                    </section>
                </main>

                <footer>
                <p>&copy; 2024 Eric Peters</p>
                </footer>

            </BrowserRouter>
        </div>
  );
}

export default App;