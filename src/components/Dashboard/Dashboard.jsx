import { useEffect, useContext, useState } from "react";

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
            <h1>Welcome, {user?.username}</h1>
            <p>
                This is a temporary dashboard page that will currently just show a list of all users to users who are signed in.
            </p>
            <hr />
            Users with profiles
            <hr />
            <ul className="nodots users">
                {users.map(user => (
                    <>
                    {profiles.map(profile => (
                        <>
                        {(profile.userId === user._id) ? (
                            <li key={user._id}>
                                <details>
                                    <summary>
                                        <img className="avatar" src={profile.avatar} />{user.username}
                                    </summary>
                                    {/* {user._id} */}
                                    <div>
                                    <ul className="nodots">
                                        Statistics:
                                        <li>Comments Posted: {profile.commentsPosted.length}</li>
                                        <li>{profile.bio}</li>
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
            All Users
            <hr />
            <ul className="nodots users">
                {users.map(user => (
                    <li key={user._id}>
                        {user.username}
                    </li>
                ))}
            </ul>
            <hr />
        </main>
    );
};


export default Dashboard;
