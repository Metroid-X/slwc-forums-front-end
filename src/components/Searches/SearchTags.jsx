
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams as useSearchParams, } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const SearchTags = ({props, getSomeId, searchbar}) => {
    let params = useSearchParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [message, setMessage] = useState('');
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [forums, setForums] = useState([]);

    const { forum, handleForum, } = props;
    
    useEffect(() => {
        const fetchStuff = async () => {
            try {
                const fetchedProfiles = await profileService.index();
                console.log(fetchedProfiles);
                setProfiles([...fetchedProfiles]);
                
                handleForum(params.branchName);
                
                const fetchedTopics = await forumService.search(params.tags?params.tags.replaceAll('+',' '):null);
                console.log(fetchedTopics);
                setTopics([...fetchedTopics]);
                
                const fetchedForums = await forumService.index();
                console.log(fetchedForums);
                setForums([...fetchedForums]);
                
                const fetchedComments = await commentService.index();
                console.log(fetchedComments);
                setComments([...fetchedComments]);
                
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchStuff();

        
    }, [user]);

    
    const [formData, setFormData] = useState({
        q: '',
        t: params.tags?(params.tags):(null),
    });

    const { q, t, } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({...formData, [evt.target.name]: evt.target.value });
    }

    const handleTag = async (evt) => {
        evt.preventDefault()
        const searchResult = await forumService.search(formData.t);
        setTopics(searchResult);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const searchResult = await forumService.search(formData.t);
            setTopics(searchResult);
            navigate(`/forum/search/${formData.t.replaceAll(' ','+')}`);
        } catch (err) {
            setMessage(err.message);
        }
    }

    console.log(formData)

    return (
        <main>
            <title>Search</title>

            {searchbar?(
                <form onSubmit={handleSubmit} id="search-bar" className="bordered padded">
                    {/* <div className="margined padded">
                        <label htmlFor="q">Search by Name: &nbsp;</label> 
                        <input 
                            id="q"
                            value={q}
                            type="text" 
                            name="q"
                            onChange={handleChange}
                        /> &nbsp; 
                    </div> */}
                    <div className="margined padded">
                        <label htmlFor="t">Search by Tags: &nbsp;</label>
                        <input 
                            id="t"
                            defaultValue={params.tags}
                            type="text" 
                            name="t"
                            onChange={handleChange}
                        /> &nbsp;
                    </div> 
                    <div className="submit go-right">
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                </form>
            ):(
                <>
                no search
                </>
            )}

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
                        <h3 className="no-top">
                        <Link to={`/forums/${topic.forumName}/${topic._id}`} >
                                &nbsp; {topic.title}
                        </Link>
                        </h3>
                        <p className="under-top">
                            &nbsp;&nbsp;
                            <span className="bordered tags">
                                tags:
                                {topic.tags?.map(tag=>(
                                    <Link 
                                        key={tag} 
                                        className="tag"
                                        to={`/forum/search/${tag}`}
                                        onClick={() => {window.location.href=`/forum/search/${tag}`;}}
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </span>
                        </p>
                        {topic.description}
                    </div>
                    <sub className="faded">
                        Posted in <Link to={`/forums/${topic.forumName}`}>
                        {forums.find(({_id}) => _id === topic.forumId )?.name}
                        </Link>
                    </sub>
                </li>
            ))}
            </ul>
            <br />
            {user?(
                <Link to='/forums/undecided/new' className="" >
                    Create New Topic Here
                </Link>
            ):(
                <></>
            )}
        </main>
    )
}



export default SearchTags;