export default function Navbar() {
    return (
        <nav className="nav">
                <ul className="pages">
                    <li>
                    <a href="/tractors">Tractors</a> 
                    </li> 
                    <li>
                    <a href="/trailers">Trailers</a>
                    </li>
                    <li>
                    <a href="/home">Home</a>
                    </li>
                </ul>
                <a href="/" className="site-title"> Chalk Mountain Services Asset Management</a>
                <p className="welcome">Welcome, John Doe!</p>
        </nav>
    )
}