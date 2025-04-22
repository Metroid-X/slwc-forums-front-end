import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';
import * as imageService from '../../services/imageService';

const Forums = ({props}) => {
    let params = useParams();
    const { user } = useContext(UserContext);
    // const forums = props.forums;
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const fetchStuff = async () => {
            try {
                const fetchedUsers = await userService.index();
                console.log(fetchedUsers);
                setUsers([...fetchedUsers]);
                
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
                
                const fetchedBranches = await forumService.index();
                console.log(fetchedBranches);
                setForums([...fetchedBranches]);
                
                const fetchedTopics = await topicService.index();
                console.log(fetchedTopics);
                setTopics([...fetchedTopics]);
                
                const fetchedComments = await commentService.index();
                console.log(fetchedComments);
                setComments([...fetchedComments]);
                
                const fetchedImages = await imageService.index();
                console.log(fetchedImages);
                setImages([...fetchedImages]);
                
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchStuff();
        
    }, [user])
    
    const forum = (forums.find(({name}) => name === params.branchName));

    return (
        <main>
            {forums.map(forum => (
                forum.name === params.branchName ? (
                    <>
                    {forum.name}
                    <br />
                    <ul className="nodots">
                    {(topics.filter(({forumName}) => forumName === params.branchName)).map(topic => (
                        <li className="bordered padded">
                            <div>
                                <Link to={`/forums/${topic.forumName}/${topic._id}`}>
                                    <h4>
                                        {topic.title}
                                    </h4>
                                </Link>
                            </div>
                        </li>
                    ))}
                    </ul>
                    <>

                    </>
                    <br />
                    <Link to='/topics/new' >
                        Create Topic Here
                    </Link>
                    </>
                ) : (
                    <></>
                )
            ))}
        </main>
    )
}


export default Forums;
