import { useState, useEffect } from 'react';
import axios from "axios";

export default function Navbar() {
    const [userName, setUserName] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        async function fetchUserName() {
            try {
                const response = await axios.get('http://localhost:8090/api/ldap/getName', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                      'sessionId': document.cookie.split('=')[1]
                    }
                });
                if(response.data ===  "Signed Out User") {
                    setUserName('')
                } else {
                    setUserName(", " + response.data);
                }
            
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserName();
    }, []);

    const signout = async () => {
        try {
          const sessionId = document.cookie.split('=')[1]
          const options = {
            method: 'POST',
            headers: { 'sessionId': sessionId },
          };
          await fetch('http://localhost:8090/api/ldap/logout', options);
          document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "http://localhost:3000/login";
        } catch (error) {
          console.error(error);
        }
      }
      
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    return (
        <nav className="nav">
            { showMenu ? (
                <div className="menu">
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
                    <p className="nav-welcome">Welcome{userName}!</p>
                    <button onClick={closeMenu} className="close-menu">X</button>
                </div>
            ) : (
                <div className="menu-toggle">
                    <button onClick={toggleMenu} className="menu-icon">&#9776;</button>
                    <a href="/" className="short-title">CMSAM</a>
                    <button onClick={signout} className="logout"> Logout</button>
                </div>
            )}

             <div className="nomenu">
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
                <a href="/" className="full-title">Chalk Mountain Services Asset Management</a>
                <p className="nav-welcome">Welcome{userName}!</p>
                <button onClick={signout} className="logout"> Logout</button>
            </div>
        </nav>        
    )
}

