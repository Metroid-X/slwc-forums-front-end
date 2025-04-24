import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const NewTopicForm = ({props}) => {
    let params = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [branch, setBranch] = useState({});
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');

    const { forum, handleForum, } = props;

    useEffect(() => {

        const fetchStuff = async () => {
            try {
                const fetchedUsers = await userService.index();
                // console.log(fetchedUsers);
                setUsers([...fetchedUsers]);

                const fetchedProfiles = await profileService.index();
                // console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);

                const fetchedBranches = await forumService.index();
                // console.log(fetchedBranches);
                setForums([...fetchedBranches]);
                
                const fetchedTopics = await topicService.index();
                // console.log(fetchedTopics);
                setTopics([...fetchedTopics]);
                
                const fetchedComments = await commentService.index();
                // console.log(fetchedComments);
                setComments([...fetchedComments]);

                const fetchedBranch = await forumService.newTopic(params.branchName);
                // console.log(fetchedBranch);
                setBranch({...fetchedBranch});
                
                handleForum(params.branchName);

                setFormData({ ...formData, forumName: (
                    params.branchName!=='undecided'&&forumName===''
                )?(
                    params.branchName
                ):(
                    forumName
                ) })

            } catch (err) {
                console.log(err);
            }
        };

        fetchStuff();

    }, [user])

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        forumName: branch?.name?(branch.name):(''),
        linkedImages: '',
        tags: '',
    });

    const { title, forumName, linkedImages, desc, tags, } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        console.log(formData)
        if (forumName!==params.branchName) {
            console.log(forumName);
            navigate(`/forums/${forumName===''?(params.branchName):(forumName)}/new`, { replace: true });
        };
    };

    // setFormData({...formData, name: currentForum.name})

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newTopic = await topicService.create(formData);
            setTopics([newTopic, ...topics])
            navigate(`/forums/${newTopic.topic.forumName}/${newTopic.topic._id}`);
        } catch (err) {
            setMessage(err.message);
        }
    }

    const isFormInvalid = () => {
        return !(forumName && title && desc);
    };

    return (
        <>
        <title>New Topic</title>
        <main className="form">
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="forumName">*Branch to Post:</label>
                    <select 
                        type='text'
                        id='branch'
                        name='forumName'
                        
                        onChange={handleChange}
                        onClick={handleChange}
                        required
                    >
                        {(params.branchName!=='undecided')?(
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
                    <label htmlFor="tags">Tags:</label>
                    <input 
                        type='text'
                        id='tags'
                        value={tags}
                        name='tags'
                        onChange={handleChange}
                    />
                    <sup>*Separate tags with spaces</sup>
                </div>
                <div className="field">
                    <label htmlFor="desc">*Description:</label>
                    <textarea 
                        id='desc'
                        value={desc}
                        name='desc'
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
        </>
    );
}


export default NewTopicForm;