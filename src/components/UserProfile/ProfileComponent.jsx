import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';


const ProfileComponent = ({props}) => {
    const params = useParams();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({});
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [images, setImages] = useState([]);



    useEffect(() => {
       
        const fetchStuff = async () => {
            try {

                const fetchedTopics = await topicService.index();
                console.log(fetchedTopics);
                setTopics([...fetchedTopics]);

                const fetchedComments = await commentService.index();
                console.log(fetchedComments);
                setComments([...fetchedComments]);

                const fetchedDisplay = await profileService.userprofile(params.profileId);
                console.log(fetchedDisplay);
                setProfile({...fetchedDisplay});

            } catch (err) {
                console.log(err);
            }
        };

        fetchStuff();


    }, []);

    return (
        <main>
            {/* Profile Id: {params.profileId} */}
            <div className="av-box bordered padded">
                Options:
                {(profile._id === user.profile) ? (
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link>edit your profile</Link>
                    </>
                ) : (
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    .  .  .
                    </>
                )}
            </div>
            <hr />
            <div className="av-box bordered">
                <h4>
                    <img className="avatar" src={profile.avatar}  />
                    {profile.displayName}
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
                            topics.filter(topic => topic.userId === profile._id).length
                        }&nbsp;&nbsp;</sup> 
                        <sup>|&nbsp;&nbsp;Comments: {
                            comments.filter(comment => comment.userId === profile._id && comment.isTopicBody === false).length
                        }&nbsp;&nbsp;</sup>
                        <sup>|&nbsp;&nbsp;Images: {
                            images.filter(image => image.userId === profile._id).length
                        }&nbsp;&nbsp;|</sup>
                    </span>
                </h4>
            </div>
        </main>
    );
};


export default ProfileComponent;
