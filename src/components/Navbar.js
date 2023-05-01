import { useState, useEffect } from 'react';
import axios from "axios";

export default function Navbar() {
    const [userName, setUserName] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchUserName() {
            try {
                const sessionId = getCookie("sessionId");
                if (sessionId) {
                    setIsUserLoggedIn(true);
                    const response = await axios.get('http://localhost:8090/api/ldap/getName', {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*',
                          'sessionId': sessionId
                        }
                    });
                    if(response.data ===  "Signed Out User") {
                        setUserName('')
                    } else {
                        setUserName(", " + response.data);
                    }
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
          signin();
        } catch (error) {
          console.error(error);
        }
    }

    const signin = async () => {
        window.location.href = "http://localhost:3000/login";
    }
      
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    const getCookie = (name) => {
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(`${name}=`.length, cookie.length);
            }
        }
        return null;
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
                    {isUserLoggedIn ? (
                        <button onClick={signout} className="logout">Logout</button>
                    ) : (
                        <a href="http://localhost:3000/login" className="logout">Login</a>
                    )}
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
                {isUserLoggedIn ? (
                    <button onClick={signout} className="logout">Logout</button>
                ) : (
                    <button onClick={signin} className="logout">Login</button>
                )}
            </div>
        </nav>        
    )
}

