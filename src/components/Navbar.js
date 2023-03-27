import { useState, useEffect } from 'react';
import axios from "axios";

export default function Navbar() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        async function fetchUserName() {
        try {
            const response = await axios.get('http://tcu-dev02:8090/api/ldap/getName');
            if(response.data ===  "Signed Out User") {
                setUserName('')
            } else {
                setUserName(", " + response.data);
            }
            
        } catch (error) {
            console.error(error);
        }}
        fetchUserName();
    }, []);

    const signout = async () => {
        try {
            await axios.get('http://tcu-dev02:8090/api/ldap/logout');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="nav">
                <ul className="pages">
                    <li>
                    <a href="/home">Home</a>
                    </li>
                    <li>
                    <a href="/tractors">Tractors</a> 
                    </li> 
                    <li>
                    <a href="/trailers">Trailers</a>
                    </li>
                </ul>
                <a href="/" className="site-title"> Chalk Mountain Services Asset Management</a>
                <p className="nav-welcome">Welcome{userName}!</p>
                <a href="/login" className="logout"> Logout</a>

        </nav>
    )
}