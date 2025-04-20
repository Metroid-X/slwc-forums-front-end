import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';

const UserProfile = () => {
    const params = useParams()
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [profile, setProfile] = useState([]);

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
        
        const fetchProfile = async () => {
            try {
                const fetchedProfile = await profileService.userprofile(params.profileId);
                console.log(fetchedProfile);
                setProfile([...[fetchedProfile]]);


            } catch (err) {
                console.log(err);
            }
        }

        const fetchProfiles = async () => {
            try {
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...[fetchedProfiles]]);


            } catch (err) {
                console.log(err);
            }
        }

        if (user) { fetchProfile(); fetchProfiles(); fetchUsers(); };

    }, [user]);

    console.log(profiles)

    return (
        <main>
            <h3>This is a temporary page for displaying a user profile.</h3>
            Username: {params.userName}
            <br/>
            User Id: {params.profileId}
            <div>
                <h2>Username: {}</h2>
            </div>
        </main>
    )
}


export default UserProfile;
