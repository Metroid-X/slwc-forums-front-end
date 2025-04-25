import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';


const ProfileComponent = ({getFuncs}) => {
    const params = useParams();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({});
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [images, setImages] = useState([]);
    const [profilePosts, setProfilePosts] = useState({});

    const { getSortedByDate, writeDate } = getFuncs

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

                const fetchedPosts = await forumService.searchByUser(params.profileId);
                console.log(fetchedPosts);
                setProfilePosts(fetchedPosts);

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
                {(profile._id === user?.profile) ? (
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link
                        to={`/profiles/${profile?.displayName}/${user?.profile}/edit`}
                    >
                        edit your profile
                    </Link>
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
                    <sup className="go-right un-header">
                        <span className="go-right">
                            {writeDate('Joined on', profile?.joinDate, profile?.dateUpdated)}
                        </span>
                        <br />
                        <span className="go-right">
                            Followers: {(profile.followers)?(
                            <>{profile.followers.length}</>
                            ):(<>0</>)}
                            &nbsp;&nbsp;-&nbsp;&nbsp;Following: {(profile.following)?(
                                <>{profile.followers.length}</>
                            ):(<>0</>)}
                        </span>
                    </sup>
                    <br/>
                    <span className="un-header">
                        <sup>|&nbsp;&nbsp;Topics: {
                            topics.filter(topic => topic.userId === profile._id).length
                        }&nbsp;&nbsp;</sup> 
                        <sup>|&nbsp;&nbsp;Comments: {
                            comments.filter(comment => comment.userId === profile._id).length
                        }&nbsp;&nbsp;</sup>
                        <sup>|&nbsp;&nbsp;Images: {
                            images.filter(image => image.userId === profile._id).length
                        }&nbsp;&nbsp;|</sup>
                    </span>
                    
                </h4>
            </div>
            <hr />
            <ul className="bordered padded nodots no-center-text no-top">
            5 most recent Topics:
            {getSortedByDate(profilePosts.topicsResult)?.slice(0,4).map(topic => (
                <li className="" key={topic._id}>
                    <div className="top-box bordered padded comment" >
                        <sup className="go-right">
                            {writeDate(
                                'Posted',
                                topic?.datePosted,
                                topic?.dateUpdated
                            )}
                        </sup>
                        <div className="av-box bordered author go-left">
                            <Link to={(`/profiles/${profile.displayName}/${topic.userId}`)}>
                                <h4>
                                    <img className="avatar" src={profile.avatar} />
                                    {profile.displayName}
                                </h4>
                            </Link>
                        </div>
                        <h3 className="no-top">
                        <Link to={`/forums/${topic.forumName}/${topic._id}`} >
                                &nbsp; {topic.title}
                        </Link>
                        </h3>
                        <p className="under-top">
                            &nbsp;&nbsp;
                            <span className="bordered tags">
                                tags:
                                {topic.tags?.map(tag=>(
                                    <Link 
                                        key={tag} 
                                        className="tag"
                                        to={`/forum/search/${tag}`}
                                        onClick={() => {window.location.href=`/forum/search/${tag}`;}}
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </span>
                        </p>
                        {topic.description}
                        <div>
                            <sub className="faded">
                                Posted in <Link to={`/forums/${topic.forumName}`}>
                                {topic.forumName}
                                </Link>
                            </sub>
                        </div>
                    </div>
                    
                </li>
            ))}
            </ul>
        </main>
    );
};


export default ProfileComponent;
