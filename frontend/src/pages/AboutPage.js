import React, { useEffect, useState }  from 'react';

function AboutPage() {
    const [username, setUsername] = useState('');

        // Get and set username
        useEffect(() => {
                const userDataString = localStorage.getItem('currentUser');
                console.log(userDataString);
                if (userDataString) {
                    try {
                        const userData = JSON.parse(userDataString);  
                        setUsername(userData.userName);
                        setCurrentUserId(userData._id);
                    } catch (error) {
                        console.log("Error parsing user data from localStorage:", error);
                    }
                } else {
                    console.log('No user data found in localStorage');
                }
            }, []);

    return (
        <>
        <h2>Welcome to the About Page, {username}!</h2>
        <div className='aboutList'>
            <ul>
                <li>How do I buy games?</li>
                    <p> You can buy games by going to the buy page and clicking the add button next
                        to the listed game. Save your selections and checkout in the account page. 
                        New users start with $50.00!
                    </p>
                <li>How do I sell games?</li>
                    <p> Fill out the sale form and submit. When your game has been bought by another customer, 
                        your account page will update with a fulfilled listing and your wallet will update accordingly.
                    </p>
            </ul>
            
        </div>
        <p id="inquiries"> For all other inquiries, email me at peterer2@oregonstate.edu </p>
        </>
    );
}
export default AboutPage;