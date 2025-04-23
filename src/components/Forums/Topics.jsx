import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const Topics = () => {
    let params = useParams();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [branchTopic, setTopic] = useState({
        branch: {},
        topic: {},
        topicComments: [],
        profile: {},
        bodyComment: {},
    });
    const [comments, setComments] = useState([]);

    useEffect(() => {

        const fetchStuff = async () => {
            
            const fetchedProfiles = await profileService.index();
            console.log(fetchedProfiles);
            setProfiles([...fetchedProfiles]);
            
            const fetchedForums = await forumService.index();
            console.log(fetchedForums);
            setForums([...fetchedForums]);
            
            const fetchedTopic = await topicService.branchTopic(params.branchName, params.topicId);
            console.log(fetchedTopic);
            setTopic({...fetchedTopic});
            
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
    
    const { branch, topic, topicComments, profile, bodyComment, } = branchTopic

    return (
        <main className="margined no-center-text">
            <div className="bordered padded">
                <div className="bordered padded margined">
                    Options:
                    {(topic.userId === user.profile) ? (
                        <>
                        &nbsp;&nbsp;
                        <Link to={`/forums/${params.branchName}/${params.topicId}/edit`}>edit this topic</Link>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link onClick={() => handleDeleteTopic(topic._id)} to={`/forums/${params.branchName}`}>delete this topic</Link>
                        </>
                    ) : (
                        <>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        this isn't your topic
                        </>
                    )}
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
                </div>
                
                <div className="padded margined">
                    <div className="bordered padded margined">
                        {bodyComment.body}
                        {(bodyComment.linkedImages)?(
                            <>
                                {bodyComment.linkedImages?.map(imgURL => (
                                    <>{imgURL?(<img key={imgURL} src={imgURL}/>):(null)}</>
                                ))}
                            </>
                        ):(
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}


export default Topics;
