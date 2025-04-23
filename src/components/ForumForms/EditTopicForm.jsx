import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const EditTopicForum = ({props, getSomeId}) => {
    let params = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');
    const [branchTopic, setTopic] = useState({
        branch: {},
        topic: {},
        topicComments: [],
        profile: {},
        bodyComment: {},
    });

    const { branch, topic, topicComments, profile, bodyComment } = branchTopic;

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

                const fetchedTopic = await topicService.branchTopic(params.branchName, params.topicId);
                console.log(fetchedTopic);
                setTopic({...fetchedTopic});
                
            } catch (err) {
                console.log(err);
            }
        };

        fetchStuff();

    }, [user])
    
    const [formData, setFormData] = useState({
        title: topic.title,
        bodyContent: (bodyComment.body),
        linkedImages: (bodyComment.linkedImages),
        tags: '',
    });

    const { title, linkedImages, bodyContent, } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const updatedTopic = await topicService.update(formData, params.topicId);
            setMessage(JSON.stringify(updatedTopic));
            navigate(`/forums/${params.branchName}/${params.topicId}`);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(title && bodyContent);
    };

    console.log(formData);

    return (
        <main className="form">
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="title">*Title:</label>
                    <input 
                        type='text'
                        id='title'
                        defaultValue={topic.title}
                        value={title}
                        name='title'
                        onChange={handleChange}
                        onClick={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="bodyContent">*Body:</label>
                    <textarea 
                        id='bodyContent'
                        defaultValue={bodyComment.body}
                        value={bodyContent}
                        name='bodyContent'
                        onChange={handleChange}
                        onClick={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="linkedImages">Link some Images:</label>
                    <textarea 
                        id='linkedImages'
                        value={linkedImages}
                        defaultValue={bodyComment.linkedImages}
                        name='linkedImages'
                        onChange={handleChange}
                        onClick={handleChange}
                    />
                    <sup>*Separate image URLs with spaces</sup>
                </div>
                <div>
                    <button disabled={isFormInvalid()}>
                        Submit Edit
                    </button>
                    <button onClick={() => navigate(`/forums/${params.branchName}/${params.topicId}`)}>
                        Cancel Edit
                    </button>
                </div>
            </form>
        </main>
    );
}


export default EditTopicForum;