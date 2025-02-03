import React, { useEffect, useState }  from 'react';


function SellPage() {
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gamePrice, setGamePrice] = useState("");
    const [username, setUsername] = useState('');
    
    // Get and set username
    useEffect(() => {
        const userDataString = localStorage.getItem('currentUser');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);  // Try parsing the string to JSON
                setUsername(userData.userName);
            } catch (error) {
                console.log("Error parsing user data from localStorage:", error);
            }
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    
    // Handle user submitting sale form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the backend
        const gameData = {
            title: gameName,
            description: gameDescription,
            price: gamePrice,
            image: "newGame.png", // Placeholder for now
            seller: username
        };
    
        try {
            // Send the POST request to the backend to add the new game
            const response = await fetch('http://localhost:5000/api/games/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameData)
            });
    
            const result = await response.json();
    
            // Check if the game was successfully added
            if (response.ok) {
                
                alert('Game added successfully!')
            } else {
                alert('Error adding game');
            }
        } catch (error) {
            alert('Game added successfully!');
        }
    };

    return (
        <div>
        <h2>Welcome to the Sell Page, {username}!</h2>
        <h2>New Listing</h2>

        <form id="saleForm" onSubmit={handleSubmit}>
            <label htmlFor="gameName">Name:</label>
            <input
                type="text"
                id="gamename"
                onChange={(e) => setGameName(e.target.value)}
                required
            />
            <br />

            <label htmlFor="gameDescription">Description:</label>
            <textarea
                id="gamedescription"
                name="gamedescription"
                rows={4}
                cols={50}
                onChange={(e) => setGameDescription(e.target.value)}
                required
            />
            <br />

            <label htmlFor="gamePrice">Price:</label>
            <input
                type="number"
                id="gamePrice"
                onChange={(e) => setGamePrice(e.target.value)}
                required
            />
            <br />

            <button type="submit">Submit</button>  
        </form>
        </div>
    );
}
export default SellPage;