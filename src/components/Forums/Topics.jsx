import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const Topics = ({props}) => {
    let params = useParams();
    const { user } = useContext(UserContext);
    const [profiles, setProfiles] = useState([]);
    const [branchTopic, setTopic] = useState({
        branch: {},
        topic: {},
        topicComments: [],
        profile: {},
        topicTags: [],
    });

    const { forum, handleForum, } = props;
    
    useEffect(() => {

        const fetchStuff = async () => {
            
            const fetchedProfiles = await profileService.index();
            console.log(fetchedProfiles);
            setProfiles([...fetchedProfiles]);
            
            const fetchedTopic = await topicService.branchTopic(params.branchName, params.topicId);
            console.log(fetchedTopic);
            setTopic({...fetchedTopic});
            
            handleForum(params.branchName);

        }
        fetchStuff();
            
    },[])

    const handleDeleteTopic = async (topicId) => {
        try {
            const deletedTopic = await topicService.deleteTopic(topicId);
            
            if (deletedTopic.err) {
                throw new Error(deletedTopic.err);
            }
            navigate(`/forums/${params.branchName}`);
        } catch (err) {
            console.log(err);
        }
    };
    
    const { branch, topic, topicComments, profile, topicTags } = branchTopic

    return (
        <main className="margined no-center-text">
            <title>{topic.title}</title>
            <div className="bordered padded">
                <div className="bordered padded margined">
                    <div className="opts">
                        Options:
                        {(topic.userId === user.profile) ? (
                            <>
                            &nbsp;&nbsp;
                            <Link 
                                to={`/forums/${params.branchName}/${params.topicId}/edit`}
                                className="bttn-link"
                            >
                                edit this topic
                            </Link>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <details>
                                <span className="open">
                                    ARE YOUR SURE?
                                </span>
                                <summary>
                                    <span className="closed">
                                        Delete This Topic
                                    </span>
                                </summary>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <Link
                                    onClick={() => handleDeleteTopic(topic._id)}
                                    to={`/forums/${params.branchName}`}
                                >
                                    delete this topic
                                </Link>
                            </details>
                            </>
                        ) : (
                            <>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            this isn't your topic
                            </>
                        )}
                    </div>
                </div>
                <div className="bordered padded margined top-box">
                    <div className="av-box bordered author go-left">
                        <Link to={(`/profiles/${profile.displayName}/${profile._id}`)}>
                            <div>
                                <h4>
                                    <img className="avatar" src={profile.avatar} />
                                    {profile.displayName}
                                </h4>
                            </div>
                        </Link>
                    </div>
                    <h3 className="no-top">
                        &nbsp; {topic.title}
                    </h3>
                    <p className="under-top">
                        &nbsp;&nbsp;
                        <span className="bordered tags">
                            tags:
                            {topicTags?.map(tag=>(
                                <Link 
                                    key={tag} 
                                    className="tag"
                                    to={`/forum/search/${tag}`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </span>
                    </p>
                </div>
                
                <div className="padded margined">
                    <div className="bordered padded margined">
                        {topic.description}
                        {(topic.linkedImages)?(
                            <>
                                {topic.linkedImages?.map(imgURL => (
                                    <>{imgURL?(<img key={imgURL} src={imgURL}/>):(null)}</>
                                ))}
                            </>
                        ):(
                            <></>
                        )}
                    </div>
                    {topicComments?.map(comment=>(
                        <div className="bordered padded margined">
                            {comment.body}
                            {(comment.linkedImages)?(
                                <>
                                    {comment.linkedImages?.map(imgURL => (
                                        <>{imgURL?(<img key={imgURL} src={imgURL}/>):(null)}</>
                                    ))}
                                </>
                            ):(
                                <></>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}


export default Topics;
