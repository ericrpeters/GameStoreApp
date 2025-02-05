import React, { useEffect, useState }  from 'react';

function AccountPage() {
    const [userGames, setUserGames] = useState([]);
    const [walletAmount, setWalletAmount] = useState(0);
    const [username, setUsername] = useState('');
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const userDataString = localStorage.getItem('currentUser');
        if (userDataString) {
            try {
                // Get and set username
                const userData = JSON.parse(userDataString);  
                setUsername(userData.userName);
                
                // Load cart data from local storage
                const storedCart = JSON.parse(localStorage.getItem(`cart_${userData.userName}`)) || [];
                setCart(storedCart);

                // Calculate total price
                const total = storedCart.reduce((sum, item) => sum + item.price, 0);
                setTotalPrice(total);

                // Fetch wallet balance
                const walletBalance = localStorage.getItem(`wallet_${userData.userName}`);
                if (walletBalance !== null) {
                    setWalletAmount(parseFloat(walletBalance));  // Set the wallet balance
                } else {
                    setWalletAmount(50);  // Default balance if not found
                }

            } catch (error) {
                console.log("Error parsing user data from localStorage:", error);
            }
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);
    
    
    useEffect(() => {
        // Fetch user games only if the user ID is available
        if (username) {
            const fetchUserGames = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/games/user/${username}`);
                    const result = await response.json();
                    if (response.ok) {
                        setUserGames(result.games);  // Populate the table with the user's games
                    } else {
                        console.log("Error fetching user's games:", result.message);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            fetchUserGames();
        }
    }, [username]);
   
    const handleRemoveListing = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/games/${gameId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (response.ok) {
                setUserGames(userGames.filter(game => game._id !== gameId));  // Remove from the state
                console.log("Listing removed successfully.");
            } else {
                console.log("Error removing listing:", result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleConfirmCheckout = () => {
        const userConfirmed = window.confirm("Are you sure you want to proceed with checkout?");
        if (userConfirmed) {
            handleCheckout();
        }
    };

    const handleCheckout = () => {
        // Calculate total price of items in the cart
        const totalCartAmount = cart.reduce((total, game) => total + game.price, 0);

        if (totalCartAmount > walletAmount) {
            // If the user doesn't have enough money
            alert("You do not have enough funds for this transaction.");
            return;
        }

        // Deduct the amount from the wallet
        const newWalletAmount = walletAmount - totalCartAmount;

        // Update wallet in localStorage
        localStorage.setItem(`wallet_${username}`, newWalletAmount.toFixed(2));

        // Loop through the cart and update the seller's wallet for each game
        cart.forEach(async (game) => {
            // Get the seller's username from the game object
            const sellerUsername = game.seller;
            if (sellerUsername) {
                // Get the seller's current wallet balance from localStorage
                const sellerWalletKey = `wallet_${sellerUsername}`;
                let sellerWalletAmount = parseFloat(localStorage.getItem(sellerWalletKey));  

                // Add the game price to the seller's wallet
                sellerWalletAmount += game.price;

                // Update the seller's wallet in localStorage
                localStorage.setItem(sellerWalletKey, sellerWalletAmount.toFixed(2));
            }
            try {
                // Update the game status to sold
                const response = await fetch(`http://localhost:5000/api/games/${game.gameId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sold: true }),
                });
    
                const result = await response.json();
                if (!response.ok) {
                    alert('Failed to update game status');
                }
    
                // Delete the game from the database after updating status
                const deleteResponse = await fetch(`http://localhost:5000/api/games/${game.gameId}`, {
                    method: 'DELETE',
                });
    
                if (!deleteResponse.ok) {
                    alert('Failed to delete the game from the database');
                    return;
                }
    
    
            } catch (error) {
                console.error('Error during transaction or deleting game:', error);
            }
        });

        // Clear the cart (after successful transaction)
        localStorage.removeItem(`cart_${username}`);

        // Update state
        setWalletAmount(newWalletAmount);
        setTotalPrice(0);
        setCart([]);
        alert("Transaction successful! Your wallet has been updated.");
    };

    const handleConfirmClearCart = () => {
        const userConfirmed = window.confirm("Are you sure you want to clear the cart?");
        if (userConfirmed) {
            handleClearCart();
        }
    }

    const handleClearCart = () => {
        localStorage.removeItem(`cart_${username}`);
        setCart([]);
    };


    return (
        <div>
        <h2>Welcome to the Account Page, {username}!</h2>
        <table id="accounthead">
            <tr>
                <td>Wallet</td>
                <td>${walletAmount.toFixed(2)}</td>
            </tr>
        </table>
        <div id="checkoutButton">
            <button onClick={() => handleConfirmCheckout()}> Checkout </button>
        </div>
        <h3>Account Listings</h3>
        <table id="accountlistings">
            <thead>
            <tr>
                <th>Name</th>
                <th>Listed Price</th>
                <th>Remove Listing</th>
               
            </tr>
            </thead>
            <tbody>
                {userGames.length > 0 ? (
                    userGames.map(game => (
                        <tr key={game._id}>
                            <td>{game.title}</td>
                            <td>${game.price.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleRemoveListing(game._id)}>
                                    Remove Listing
                                </button>
                            </td>
                           
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No listings available</td>
                    </tr>
                )}
            </tbody>     
        </table>
        <h3>My Cart</h3>
        <div id="clearCart">
            <button onClick={() => handleConfirmClearCart()}> Clear Cart </button>
        </div>
        <table id="cart">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>${item.price.toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">Your cart is empty.</td>
                    </tr>
                )}
            </tbody>
        </table>

        <p id="total">Total: ${totalPrice.toFixed(2)}</p>
        </div>
    );
}
export default AccountPage;