import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';
import * as imageService from '../../services/imageService';

const Forums = ({props, getSomeId}) => {
    let params = useParams();
    const { user } = useContext(UserContext);
    // const forums = props.forums;
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forum, setForum] = useState({});
    const [branchTopics, setBranchTopics] = useState({
        branch: {},
        topics: [],
    });
    const [comments, setComments] = useState([]);
    const [images, setImages] = useState([]);

    const { branch, topics, } = branchTopics;
    
    useEffect(() => {
        const fetchStuff = async () => {
            try {
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
                
                // const fetchedForum = await forumService.branch(params.branchName);
                // console.log(fetchedForum);
                // setForum({...fetchedForum});
                
                const fetchedTopics = await topicService.branch(params.branchName);
                console.log(fetchedTopics);
                setBranchTopics({...fetchedTopics});
                
                const fetchedComments = await commentService.index();
                console.log(fetchedComments);
                setComments([...fetchedComments]);
                
                const fetchedImages = await imageService.index();
                // console.log(fetchedImages);
                setImages([...fetchedImages]);
                
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchStuff();
        
    }, [user]);

    return (
        <main>
            {branch.name}
            <br />
            <ul className="nodots no-center-text">
            {topics.map(topic => (
                <li className="bordered padded" key={topic._id}>
                    <div className="top-box" >
                        <div className="av-box bordered author go-left">
                            <Link to={(`/profiles/${getSomeId(topic.userId,profiles).displayName}/${topic.userId}`)}>
                                <h4>
                                    <img className="avatar" src={getSomeId(topic.userId,profiles).avatar} />
                                    {getSomeId(topic.userId,profiles).displayName}
                                </h4>
                            </Link>
                        </div>
                        <Link to={`/forums/${params.branchName}/${topic._id}`} >
                            <h3 className="no-top">
                                &nbsp; {topic.title}
                            </h3>
                            <br />
                        </Link>
                        {comments.map(comment => (
                            <>
                            {comment.topicId === topic._id ? (
                                <>
                                {comment.isTopicBody ? (
                                    <>
                                    {comment.body}
                                    </>
                                ) : (
                                    <>
                                    
                                    </>
                                )}
                                </>
                            ) : (<></>)}
                            </>
                        ))
                        }
                    </div>
                </li>
            ))}
            </ul>
            <br />
            <Link to='/topics/new' >
                Create Topic Here
            </Link>
        </main>
    )
}


export default Forums;
