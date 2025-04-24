import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import Forums from './components/Forums/Forums';
import Topics from './components/Forums/Topics';
import NewTopicForm from './components/ForumForms/NewTopicForm';
import EditTopicForm from './components/ForumForms/EditTopicForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';

import SearchTags from './components/Searches/SearchTags';

import * as userService from './services/userService';
import * as profileService from './services/profileService';
import * as forumService from './services/forumService';
import * as topicService from './services/topicService';
import * as commentService from './services/commentService';

import { UserContext } from './contexts/UserContext';

import './App.css'


const App = () => {
  const { user } = useContext(UserContext);
  const params = useSearchParams();
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [forums, setForums] = useState([]);
  const [forum, setForum] = useState({});
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const fetchStuff = async () => {
      try {

        const fetchedProfiles = await profileService.index();
        // console.log(fetchedProfiles);
        setProfiles([...fetchedProfiles]);

        const fetchedUserProfile = await profileService.userprofile(user.profile);
        // console.log(fetchedUserProfile);
        setUserProfile({...fetchedUserProfile});

        const fetchedUsers = await userService.index();
        // console.log(fetchedUsers);
        setUsers([...fetchedUsers]);
        
        const fetchedForums = await forumService.index();
        // console.log(fetchedForums);
        setForums([...fetchedForums]);

        const fetchedTopics = await topicService.index();
        // console.log(fetchedTopics);
        setTopics([...fetchedTopics]);

        const fetchedComments = await commentService.index();
        // console.log(fetchedComments);
        setComments([...fetchedComments]);
        
      } catch (err) {
        console.log(err);
      };
    };

    fetchStuff();
  },[]);

  const handleForum = async (name) => {
    // const fetchedForum = await forumService.branch(name)?forumService.branch(name):{name:''};
    // console.log(fetchedForum);
    // setForum({...fetchedForum});
  };

  const props = { users, profiles, forums, topics, comments, forum, handleForum, };

  const getSomeId = (id,elem) => {
    return elem.find(({_id}) => _id === id);
  };

  return (
    <>
    <div>
      {userProfile?(<>Hello, {userProfile.displayName}</>):(<>Hello, Guest</>)}.
    </div>
      <NavBar props={props} />
      <Routes>
        <Route path='/' element={ <SearchTags props={props} getSomeId={getSomeId} searchbar={false} />} />
        <Route path='/users' element={ user ? <Dashboard props={props} /> : <SearchTags props={props} getSomeId={getSomeId} /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/profiles/:userName/:profileId' element={<UserProfile props={props}/>} />
        <Route path='/topics/new' element={<NewTopicForm props={props} getSomeId={getSomeId} />} />
        <Route path='/forum/search' element={<SearchTags props={props} getSomeId={getSomeId} searchbar={true} />} />
        <Route path='/forum/search/:tags' element={<SearchTags props={props} getSomeId={getSomeId} searchbar={true} />} />
        <Route path='/forums/:branchName/new' element={<NewTopicForm props={props} getSomeId={getSomeId} />} />
        <Route path='/forums/:branchName' element={<Forums props={props} getSomeId={getSomeId} />} />
        <Route path='/forums/:branchName/:topicId' element={<Topics props={props} getSomeId={getSomeId} />} />
        <Route path='/forums/:branchName/:topicId/edit' element={<EditTopicForm props={props} getSomeId={getSomeId} />} />
      </Routes>
    </>
  )
}

export default App
