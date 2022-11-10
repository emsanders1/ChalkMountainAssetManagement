export default function Navbar() {
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
                <p className="nav-welcome">Welcome, John Doe!</p>
                <a href="/login" className="logout"> Logout</a>

        </nav>
    )
}