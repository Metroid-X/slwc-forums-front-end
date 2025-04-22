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

const NavBar = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    useEffect(() => {

        const fetchTrustedStuff = async () => {
            try {
                const fetchedUsers = await userService.index();
                console.log(fetchedUsers);
                setUsers([...fetchedUsers]);

                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
            } catch (err) {
                console.log(err);
            }
        }

        const fetchStuff = async () => {
            try {
                const fetchedBranches = await forumService.index();
                console.log(fetchedBranches);
                setForums([...fetchedBranches]);
                
                const fetchedTopics = await topicService.index();
                console.log(fetchedTopics);
                setTopics([...fetchedTopics]);
                
                const fetchedComments = await commentService.index();
                console.log(fetchedComments);
                setComments([...fetchedComments]);
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
                >Home</Link>
                <Link to='/users' 
                    className="bordered padded margined forum-directory"
                >User-List</Link>
                <Link to='/topics/new' 
                    className="bordered padded margined forum-directory"
                >Create New Topic</Link>
                <Link to='/' 
                    className="bordered padded margined forum-directory"
                 onClick={handleSignOut}>Sign Out</Link>
            </nav>
        ) : (
            <nav className="bordered">
                <Link to='/' 
                    className="bordered padded margined forum-directory"
                >Home</Link>
                <Link to='/sign-up' 
                    className="bordered padded margined forum-directory"
                >Sign Up</Link>
                <Link to='/sign-in' 
                    className="bordered padded margined forum-directory"
                >Sign In</Link>
            </nav>
        )}
        <hr />
        <nav className="bordered">
            {forums.map(forum => (
                <Link to={`/forums/${forum.name}`} key={forum.name}
                className="bordered padded margined forum-directory"
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
