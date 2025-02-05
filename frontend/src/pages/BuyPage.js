import React, { useState, useEffect } from 'react';

function BuyPage() {
    const [games, setGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [username, setUsername] = useState('');
    
    // Get and set username
    useEffect(() => {
        const userDataString = localStorage.getItem('currentUser');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString); 
                setUsername(userData.userName);
            } catch (error) {
                console.log("Error parsing user data from localStorage:", error);
            }
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    // Get and set game data from database
    useEffect(() => {
        // Fetch games from MongoDB
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/games');
                const data = await response.json();
                setGames(data); 
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, []);

    // Handle checkbox toggling 
    const handleCheckboxChange = (gameId) => {
        setSelectedGames(prevState => ({
            ...prevState,
            [gameId]: !prevState[gameId]  // Toggle selection
        }));
    };

    // Handle saving the selected games to a cart
    const handleSaveToCart = () => {
        const cartItems = games
            .filter(game => selectedGames[game._id]) 
            .map(game => ({
                gameId: game._id,
                title: game.title,
                price: game.price, 
                seller: game.seller
            }));
    
        if (cartItems.length === 0) {
            alert("No items selected.");
            return;
        }
    
        // Get the current user
        const userDataString = localStorage.getItem('currentUser');
        if (!userDataString) {
            alert("User not logged in.");
            return;
        }
    
        const userData = JSON.parse(userDataString);
        const username = userData.userName;
    
        // Save to local storage
        localStorage.setItem(`cart_${username}`, JSON.stringify(cartItems));
        alert("Cart saved successfully!");
    };
    

    return (
        <div>
        <h2>Welcome to the Buy Page, {username}!</h2>
        <div id="savecart">
            <button onClick={handleSaveToCart}>Save to Cart</button>
        </div>
        
        <table>
            <thead>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Add to Cart</th>
            </tr>
            </thead>
            <tbody>
            {/* If there are no games, display "No games available" */}
            {games.length > 0 ? (
                games.map((game) => {
                    return (
                        <tr key={game._id}>
                            <td><img src={`http://localhost:5000/images/${game.image}`} alt={game.title} width="200" height="120" /></td>
                            <td>{game.title}</td>
                            <td>${game.price.toFixed(2)}</td>
                            <td><input 
                                type="checkbox" 
                                value={game._id}
                                onChange={() => handleCheckboxChange(game._id)}
                            /></td>
                        </tr>
                    );
                })
            ) : (
                <p>No games available.</p>
            )}
            </tbody>
        </table>
        </div>
    );
}
export default BuyPage;