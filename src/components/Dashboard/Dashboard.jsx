import { useEffect, useContext, useState } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index();
                console.log(fetchedUsers);
                setUsers([...fetchedUsers]);
            } catch (err) {
                console.log(err);
            }
        };


        const fetchProfiles = async () => {
            try {
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
            } catch (err) {
                console.log(err);
            }
        };


        if (user) { fetchUsers(); fetchProfiles(); };


    }, [user]);

    

    return (
        <main>
            <h3>Welcome, {user?.username}</h3>
            <p>
                List of all users' profiles.
            </p>
            <hr />
            <ul className="nodots users">
                {users.map(user => (
                    <>
                    {profiles.map(profile => (
                        <>
                        {(profile.userId === user._id) ? (
                            <li key={user._id}>
                                <details>
                                    <summary className="av-box">
                                        <Link to={(`/profiles/${profile.displayName}/${profile._id}`)}><img className="avatar" src={profile.avatar} />{user.username}</Link>
                                    </summary>
                                    <div>
                                        <ul className="nodots">
                                            Statistics:
                                            <li key='stats'>
                                                
                                            </li>
                                            <li key='bio'>{profile.bio}</li>
                                        </ul>
                                    </div>
                                </details>
                            </li>
                        ):(
                            <></>
                        )}
                        </>
                    ))}
                    </>
                ))}
            </ul>
            <hr />
        </main>
    );
};


export default Dashboard;
