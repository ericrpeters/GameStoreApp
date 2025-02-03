import React, { useEffect, useState }  from 'react';

function HomePage() {
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
        
    return (
        <div>
        <h2>Welcome Home, {username}!</h2>
        <h2>Featured Games</h2>
        <table>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Was</th>
                <th>Now</th>
                <th>Discount</th>
            </tr>
            {/* This will contain data that can be pulled but will be a placeholder for now */}
            <tr>
                <td><img src={require("../images/ff7rebirth.png")} alt="Final Fantasy VII Rebirth" width="200" /></td>
                <td>Final Fantasy VII Rebirth</td>
                <td>$69.99</td>
                <td>$48.99</td>
                <td>-30%</td>
            </tr>
            <tr>
                <td><img src={require("../images/manorlords.png")} alt="Manor Lords" width="200" /></td>
                <td>Manor Lords</td>
                <td>$39.99</td>
                <td>$27.99</td>
                <td>-30%</td>
            </tr>
            <tr>
                <td><img src={require("../images/halomcc.png")} alt="Halo: MCC" width="200" /></td>
                <td>Halo: MCC</td>
                <td>$39.99</td>
                <td>$9.99</td>
                <td>-75%</td>
            </tr>
        </table>
       
        </div>
    );
}
export default HomePage;