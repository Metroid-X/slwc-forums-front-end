import { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import Comments from "../Forums/Comments";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const Topics = ({props, getFuncs}) => {
    let params = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [profiles, setProfiles] = useState([]);
    const [comments, setComments] = useState([]);
    const [branchTopic, setTopic] = useState({
        branch: {},
        topic: {},
        topicComments: [],
        profile: {},
        topicTags: [],
    });

    const { forum, handleForum, } = props;
    
    const { getSomeId, getLatestWithin, writeDate, } = getFuncs;

    const [formData, setFormData] = useState({
        topicId: params.topicId,
        commentBody: params.commentId?(topicComments?.find(
            _id => _id === params.commentId
        )?.body):(''),
        linkedImages: params.commentId?String(topicComments?.find(
            _id => _id === params.commentId
        )?.linkedImages)?.replaceAll(' ',',')?.replaceAll(',',' '):(''),
    });

    useEffect(() => {

        const fetchStuff = async () => {
            
            const fetchedProfiles = await profileService.index();
            console.log(fetchedProfiles);
            setProfiles([...fetchedProfiles]);
            
            const fetchedComments = await commentService.index();
            console.log(fetchedComments);
            setComments([...fetchedComments]);
            
            const fetchedTopic = await topicService.branchTopic(params.branchName, params.topicId);
            console.log(fetchedTopic);
            setTopic({...fetchedTopic});
            
            handleForum(params.branchName);

            setFormData({
                topicId: params.topicId,
                commentBody: params.commentId?(topicComments?.find(
                    _id => _id === params.commentId
                )?.body):(''),
                linkedImages: params.commentId?String(topicComments?.find(
                    _id => _id === params.commentId
                )?.linkedImages)?.replaceAll(' ',',')?.replaceAll(',',' '):(''),
            })

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
    
    const { branch, topic, topicComments, profile, topicTags } = branchTopic;
    
    const { commentBody, linkedImages } = formData;

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        console.log(formData)
    };

    const handleAddComment = async (evt) => {
        evt.preventDefault()
        try {
            if (params.commentId===undefined) {
                const newComment = await commentService.create(formData);
                console.log(newComment);
                setComments([...comments, newComment]);
            } else {
                const updatedComment = await commentService.update(formData,params.commentId);
                console.log(updatedComment);
            };

            const fetchedTopic = await topicService.branchTopic(params.branchName, params.topicId);
            console.log(fetchedTopic);
            setTopic({...fetchedTopic});
            
            navigate(`/forums/${params.branchName}/${params.topicId}`)
            .then(setFormData({
                topicId: params.topicId,
                commentBody: (''),
                linkedImages: (''),
            }));
            
        } catch (err) {
            console.log(err.message);
        }
    }


    const isFormInvalid = () => {
        return !(commentBody);
    };

    console.log(formData);

    return (
        <main className="margined no-center-text">
            <title>{topic.title}</title>
            <div className="bordered padded">
                <div className="bordered padded margined">
                    <div className="opts">
                        Options:
                        {(topic.userId === user?.profile) ? (
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
                    <sup className="go-right">
                        {writeDate(
                            'Posted',
                            topic.datePosted,
                            topic.dateUpdated
                        )}
                    </sup>
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
                        <Comments
                            comment={comment}
                            profile={profiles.find(
                                ({_id}) => _id === comment.userId
                            )}
                            writeDate={writeDate}
                        />
                    ))}
                </div>
                <div className="bordered padded margined">
                    {user?(
                        <form
                            id="comment-form"
                            className="top-box"
                            onSubmit={handleAddComment}
                        >
                            
                            <div className="field">
                                <label htmlFor="commentBody" >Write your Comment: </label>
                                {params.commentId?(
                                    <textarea
                                        id="commentBody"
                                        value={commentBody}
                                        name="commentBody"
                                        onChange={handleChange}
                                        required
                                    />
                                ):(
                                    <textarea
                                        id="commentBody"
                                        defaultValue={commentBody}
                                        name="commentBody"
                                        onChange={handleChange}
                                        required
                                    />
                                )}
                            </div>
                            <div className="field">
                                <label htmlFor="linkedImages" ></label>
                                {params.commentId?(
                                    <input
                                        id="linkedImages"
                                        value={linkedImages}
                                        type="text"
                                        name="linkedImages"
                                        onChange={handleChange}
                                    />
                                ):(
                                    <input
                                        id="linkedImages"
                                        defaultValue={linkedImages}
                                        type="text"
                                        name="linkedImages"
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            
                            {params.commentId?(
                                <div className="submit field side-by-side">
                                    <button
                                        disabled={isFormInvalid()}
                                        className="padded"
                                    >
                                        Update Comment
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/forums/${params.branchName}/${params.topicId}`)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ):(
                                <div className="submit field">
                                    <button 
                                        disabled={isFormInvalid}
                                        className="padded"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            )}
                        </form>
                    ):(
                        <form
                            id="comment-form"
                            className="top-box"
                            onSubmit={handleAddComment}
                        >
                            <div className="field centered">
                                You need to be signed in to comment.
                            </div>
                            <Link to={'/sign-up'}>
                                Sign Up
                            </Link>
                            <Link to={'/sign-in'}>
                                Sign In
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </main>
    )
}


export default Topics;
