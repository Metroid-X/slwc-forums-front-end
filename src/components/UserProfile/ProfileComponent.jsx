import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';


const ProfileComponent = (props) => {
    // const params = useParams();
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


        const fetchProfiles = async () => {
            try {
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
            } catch (err) {
                console.log(err);
            }
        };

        if (user) { fetchUsers(); fetchProfiles();};


    }, [user]);


    return (
        <div>
            Profile Id: {props.profileId}
            <div className="av-box bordered">
                {profiles.map(profile => (<>{users.map(user => (<>
                    {(user.username === props.userName && user._id === profile.userId) ? (
                        <>
                        <h4>
                            <img className="avatar" src={profile.avatar}  />
                            {profile.profileCompleted ? 
                            (<>{profile.displayName}</>
                            ):(<>{user.username}</>)}
                            <sup className="go-right un-header">Followers: {(profile.followers)?(
                                <>{profile.followers.length}</>
                                ):(<>0</>)}
                                &nbsp;&nbsp;-&nbsp;&nbsp;Following: {(profile.following)?(
                                    <>{profile.followers.length}</>
                                ):(<>0</>)}
                            </sup>
                            <br/>
                            <span className="un-header">
                                <sup>|&nbsp;&nbsp;Topics: {profile.topicsPosted.length}&nbsp;&nbsp;</sup> 
                                <sup>|&nbsp;&nbsp;Comments: {profile.commentsPosted.length}&nbsp;&nbsp;</sup>
                                <sup>|&nbsp;&nbsp;Images: {profile.linkedImages.length}&nbsp;&nbsp;|</sup>
                            </span>
                        </h4>
                        </>
                    ):(<></>)}
                </>))}</>))}
            </div>
        </div>
    );
};


export default ProfileComponent;
