import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "../UserProfile/ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const Forums = () => {
    let params = useParams();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [forums, setForums] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);

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
    
    return (
        <div>
            
        </div>
    )
}


export default Forums;
