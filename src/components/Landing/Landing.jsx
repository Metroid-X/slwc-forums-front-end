import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";
import Forums from "../Forums/Forums";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const Landing = ({topics, forums, profiles, getFuncs}) => {
    let params = useParams();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    const { getSomeId, getLatestWithin, writeDate, } = getFuncs;

    useEffect(() => {

        const fetchTrustedStuff = async () => {
            try {
            } catch (err) {
                console.log(err);
            }
        }

        const fetchStuff = async () => {
            try {

                const fetchedUsers = await userService.index();
                console.log(fetchedUsers);
                setUsers([...fetchedUsers]);

            } catch (err) {
                console.log(err);
            }
        };

        fetchStuff();

    }, [user])

    const getLatestTopic = (forum_id) => {
        return getLatestWithin(forum_id, topics, 'forumId');
    };

    const getLatestComment = (topic_id) => {
        return getLatestWithin(topic_id, comments, 'topicId');
    };

    return (
        <main>
            <ul className="nodots no-top no-center-text">
                {forums.map(forum => (
                    <li key={forum.name}>
                        <div className="padded-2">Latest in <Link
                            to={`/forums/${forum.name}`}
                        >
                            {forum.name}
                        </Link>:</div>
                        {getLatestTopic(forum._id)?(
                            <div className="bordered padded">
                                <sup className="go-right">
                                    {writeDate(
                                        'Posted',
                                        getLatestTopic(forum._id)?.datePosted,
                                        getLatestTopic(forum._id)?.dateUpdated
                                    )}
                                </sup>
                                <div className="top-box" >
                                    <div className="av-box bordered author go-left">
                                        <Link to={(`/profiles/${
                                                getSomeId(getLatestTopic(
                                                    forum._id,topics,
                                                )?.userId,profiles)?.displayName
                                            }/${
                                                getLatestTopic(forum._id)?.userId
                                            }`)}>
                                            <h4>
                                                <img className="avatar" src={
                                                    getSomeId(getLatestTopic(forum._id
                                                    )?.userId,profiles)?.avatar} />
                                                {getSomeId(getLatestTopic(forum._id
                                                )?.userId,profiles)?.displayName}
                                            </h4>
                                        </Link>
                                    </div>
                                    <h3 className="no-top">
                                    <Link to={`/forums/${
                                            getLatestTopic(forum._id)?.forumName
                                        }/${
                                            getLatestTopic(forum._id)?._id
                                        }`} >
                                        
                                            &nbsp; {getLatestTopic(forum._id)?.title}
                                    </Link>
                                    </h3>
                                    <div className="under-top">
                                        &nbsp;&nbsp;
                                        <span className="bordered tags">
                                            tags:
                                            {getLatestTopic(forum._id)?.tags?.map(tag=>(
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
                                        {getLatestTopic(forum._id)?.description}
                                    </p>
                                    
                                </div>
                            </div>
                        ):(
                            <div className="bordered padded top-box">
                                Looks like there's nothing here yet.
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
};



export default Landing
