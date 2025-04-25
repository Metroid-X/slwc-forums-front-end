import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const Forums = ({props, getFuncs}) => {
    let params = useParams();
    const { user } = useContext(UserContext);
    
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [branchTopics, setBranchTopics] = useState({
        branch: {},
        topics: [],
    });
    const [comments, setComments] = useState([]);

    const { branch, topics, } = branchTopics;

    const { forum, handleForum, } = props;
    
    const { getSomeId, getLatestWithin, writeDate, } = getFuncs;

    useEffect(() => {
        const fetchStuff = async () => {
            try {
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
                
                handleForum(params.branchName);
                
                const fetchedTopics = await topicService.branch(params.branchName);
                console.log(fetchedTopics);
                setBranchTopics({...fetchedTopics});
                
                const fetchedComments = await commentService.index();
                console.log(fetchedComments);
                setComments([...fetchedComments]);
                
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchStuff();

        
    }, [user]);

    const getLatestTopic = (branch_id) => {
        return getLatestWithin(branch_id, topics, 'forumId');
    };

    const getLatestComment = (topic_id) => {
        return getLatestWithin(topic_id, comments, 'topicId');
    };

    return (
        <main>
            <title>{branch.name}</title>
            <ul className="nodots no-center-text">
            {topics?.map(topic => (
                <li className="padded" key={topic._id}>
                    <div className="bordered padded">
                        <sup className="go-right">
                            {writeDate(
                                'Posted',
                                topic?.datePosted,
                                topic?.dateUpdated
                            )}
                        </sup>
                        <div className="top-box" >
                            <div className="av-box bordered author go-left">
                                <Link to={(`/profiles/${getSomeId(topic.userId,profiles).displayName}/${topic.userId}`)}>
                                    <h4>
                                        <img className="avatar" src={getSomeId(topic.userId,profiles).avatar} />
                                        {getSomeId(topic.userId,profiles).displayName}
                                    </h4>
                                </Link>
                            </div>
                            <h3 className="no-top">
                            <Link to={`/forums/${params.branchName}/${topic._id}`} >
                                
                                    &nbsp; {topic.title}
                            </Link>
                            </h3>
                            <div className="under-top">
                                &nbsp;&nbsp;
                                <span className="bordered tags">
                                    tags:
                                    {topic.tags?.map(tag=>(
                                        <Link 
                                            key={tag} 
                                            className="tag"
                                            to={`/forum/search/${tag}`}
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                            <p>
                                {topic.description}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
            
            {user?(
                <Link to={`/forums/${params.branchName}/new`} >
                    Create Topic Here
                </Link>
            ):(
                <>
                <div className="field centered">
                    You need to be signed in to post topics.
                </div>
                <div className="padded-2">
                    <Link 
                        to={'/sign-up'}
                        className="bordered padded"
                    >
                        Sign Up
                    </Link>
                    <span className="padded"/>
                    <Link 
                        to={'/sign-in'}
                        className="bordered padded"
                    >
                        Sign In
                    </Link>
                </div>
                </>
            )}
        </main>
    )
}


export default Forums;
