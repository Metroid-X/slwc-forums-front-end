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
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        const fetchStuff = async () => {
            
            const fetchedProfiles = await profileService.index();
            console.log(fetchedProfiles);
            setProfiles([...fetchedProfiles]);
            
            const fetchedForums = await forumService.index();
            console.log(fetchedForums);
            setForums([...fetchedForums]);
            
            const fetchedTopics = await topicService.index();
            console.log(fetchedTopics);
            setTopics([...fetchedTopics]);
            
        }
        fetchStuff();
            
    },[])
    
    return (
        <main className="margined">
            <div className="bordered padded">
                {topics.map(topic => (
                    <>
                        {topic._id === params.topicId ? (
                            <>
                                {profiles.map(profile =>(
                                    <>{(profile._id === topic.userId) ? (
                                        <div className="av-box bordered">
                                            <Link to={(`/profiles/${profile.displayName}/${profile._id}`)}>
                                                <h4>
                                                    <img className="avatar" src={profile.avatar} />
                                                    {profile.displayName}
                                                </h4>
                                            </Link>
                                        </div>
                                    ):(<></>)}</>
                                ))}
                            <h3>
                                {topic.title}
                            </h3>
                            
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </>
                ))}
            </div>
        </main>
    )
}


export default Topics;
