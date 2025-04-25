import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";
import Forums from "../Forums/Forums";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const NavBar = ({props}) => {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [branchName, setBranchName] = useState(``);

    const { forum, handleForum, } = props

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    useEffect(() => {

        const fetchStuff = async () => {
            try {
                const fetchedBranches = await forumService.index();
                // console.log(fetchedBranches);
                setForums([...fetchedBranches]);
                
            } catch (err) {
                console.log(err);
            }
        };

        fetchStuff();

    }, [user])
    

    return (
        <>
        <hr />
        {user ? (
            <nav className="bordered">
                <Link to='/' 
                    className="bordered padded margined forum-directory"
                >
                    Home
                </Link>
                <Link to='/users' 
                    className="bordered padded margined forum-directory"
                >
                    User-List
                </Link>
                <Link  
                    className="bordered padded margined forum-directory"
                    onClick={handleSignOut}
                 >
                    Sign Out
                 </Link>
                <Link to='/forum/search' 
                    className="bordered padded margined forum-directory"
                >
                    Forum Search
                </Link>
            </nav>
        ) : (
            <nav className="bordered">
                <Link to='/' 
                    className="bordered padded margined forum-directory"
                    onClick={() => {window.location.href=`/`;}}
                >
                    Home
                </Link>
                <Link to='/sign-up' 
                    className="bordered padded margined forum-directory"
                >
                    Sign Up
                </Link>
                <Link to='/sign-in' 
                    className="bordered padded margined forum-directory"
                >
                    Sign In
                </Link>
            </nav>
        )}
        <hr />
        <nav className="bordered">
            {forums.map(forum => (
                <Link to={`/forums/${forum.name}`} key={forum.name}
                className="bordered padded margined forum-directory"
                onClick={() => {window.location.href=`/forums/${forum.name}`;}}
                type="button"
                >
                    <div>
                        {forum.name}
                    </div>
                </Link>
            ))}
            <br />
            
        </nav>
        <hr />
        </>
    );
}



export default NavBar
