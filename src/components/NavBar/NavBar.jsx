import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
    const { user } = useContext(UserContext);


    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }


    return (
        <nav>
            
            {user ? (
                <ul className="nodots">
                    <li>Hello, {user.username}.</li>
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
                </ul>
            ) : (
                <ul className="nodots">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                </ul>
            )}
        </nav>
    );
}



export default NavBar
