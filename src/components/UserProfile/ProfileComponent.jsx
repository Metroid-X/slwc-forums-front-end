import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';


const ProfileComponent = ({props,profileId,userName}) => {
    // const params = useParams();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const forums = props.forums
    const topics = props.topics
    const comments = props.comments
    const images = props.images

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
            Profile Id: {profileId}
            <div className="av-box bordered">
                {profiles.map(profile => (<>{users.map(user => (<>
                    {(user.username === userName && user._id === profile.userId) ? (
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
                                <sup>|&nbsp;&nbsp;Topics: {
                                    topics.filter(topic => topic.userId === profileId).length
                                }&nbsp;&nbsp;</sup> 
                                <sup>|&nbsp;&nbsp;Comments: {
                                    comments.filter(comment => comment.userId === profileId).length
                                }&nbsp;&nbsp;</sup>
                                <sup>|&nbsp;&nbsp;Images: {
                                    images.filter(image => image.userId === profileId).length
                                }&nbsp;&nbsp;|</sup>
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
