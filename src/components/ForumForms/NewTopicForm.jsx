import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const NewTopicForm = () => {
    let params = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');

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

            } catch (err) {
                console.log(err);
            }
        };

        fetchStuff();

    }, [user])
    
    const [formData, setFormData] = useState({
        _user: user,
        _profile: user.profile,
        title: '',
        bodyContent: '',
        forumName: params.branchName?(params.branchName):(''),
        linkedImages: '',
    });

    const { _user, title, forumName, linkedImages, bodyContent, } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    // setFormData({...formData, name: currentForum.name})

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newTopic = await topicService.create(formData);
            setTopics([newTopic, ...topics])
            navigate(params.branchName?(`/forums/${params.branchName}`):(`/forums/${newTopic.forumName}/${newTopic._id}`));
        } catch (err) {
            setMessage(err.message);
        }
    }

    const isFormInvalid = () => {
        return !(forumName && title && bodyContent);
    };

    console.log(formData)

    return (
        <main className="form">
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="forumName">*Branch to Post:</label>
                    <select 
                        type='text'
                        id='branch'
                        name='forumName'
                        defaultValue={forumName}
                        onChange={handleChange}
                        required
                    >
                        {(params.branchName)?(
                            <option value={params.branchName} >
                                {(params.branchName).split('-').map(seg => (
                                    <>
                                    {`${seg.split('')[0].toUpperCase()}${String(seg.split('').slice(1)).replaceAll(',','')} `}
                                    </>
                                ))}
                            </option>
                        ):(
                            <option value=''>
                                Please select a forum branch
                            </option>
                        )}
                        {forums.map(forum => (
                            <>
                            {(forum.name !== params.branchName)?(
                                <option 
                                    value={forum.name} 
                                    key={forum.name}
                                >
                                    {(forum.name).split('-').map(seg => (
                                        <>
                                        {`${seg.split('')[0].toUpperCase()}${String(seg.split('').slice(1)).replaceAll(',','')} `}
                                        </>
                                    ))}
                                </option>
                            ):(
                                <></>
                            )}
                            </>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="title">*Title:</label>
                    <input 
                        type='text'
                        id='title'
                        value={title}
                        name='title'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="bodyContent">*Body:</label>
                    <textarea 
                        id='bodyContent'
                        value={bodyContent}
                        name='bodyContent'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="linkedImages">Link some Images:</label>
                    <textarea 
                        id='linkedImages'
                        value={linkedImages}
                        name='linkedImages'
                        onChange={handleChange}
                    />
                    <sup>*Separate image URLs with spaces</sup>
                </div>
                <div>
                    <button disabled={isFormInvalid()}>
                        Post It!
                    </button>
                    <button onClick={() => navigate(params.branchName?(`/forums/${params.branchName}`):(`/`))}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}


export default NewTopicForm;