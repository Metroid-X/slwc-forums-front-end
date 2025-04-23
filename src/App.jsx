import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router';

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
import ProfileComponent from './components/UserProfile/ProfileComponent';

import * as userService from './services/userService';
import * as profileService from './services/profileService';
import * as forumService from './services/forumService';
import * as topicService from './services/topicService';
import * as commentService from './services/commentService';
import * as imageService from './services/imageService';

import { UserContext } from './contexts/UserContext';

import './App.css'


const App = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [forums, setForums] = useState([]);
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchStuff = async () => {
      try {

        const fetchedProfiles = await profileService.index();
        console.log(fetchedProfiles);
        setProfiles([...fetchedProfiles]);

        const fetchedUserProfile = await profileService.userprofile(user.profile);
        console.log(fetchedUserProfile);
        setUserProfile({...fetchedUserProfile});

        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
        setUsers([...fetchedUsers]);
        
        const fetchedForums = await forumService.index();
        console.log(fetchedForums);
        setForums([...fetchedForums]);

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
      };
    };
    fetchStuff();
  },[]);

  const props = { users:users, profiles:profiles, forums:forums, topics:topics, comments:comments, images:images };

  const getSomeId = (id,elem,key=undefined) => {
    return elem.find(({_id}) => _id === id);
  };

  return (
    <>
    <div>
      {userProfile?(<>Hello, {userProfile.displayName}</>):(<>Hello, Guest</>)}.
    </div>
      <NavBar />
      <Routes>
        <Route path='/' element={ <Landing props={props} />} />
        <Route path='/users' element={ user ? <Dashboard props={props} /> : <Landing props={props} /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/profiles/:userName/:profileId' element={<UserProfile props={props}/>} />
        <Route path='/topics/new' element={<NewTopicForm props={props} getSomeId={getSomeId} />} />
        <Route path='/forums/:branchName' element={<Forums props={props} getSomeId={getSomeId} />} />
        <Route path='/forums/:branchName/:topicId' element={<Topics props={props} getSomeId={getSomeId} />} />
        <Route path='/forums/:branchName/:topicId/edit' element={<EditTopicForm props={props} getSomeId={getSomeId} />} />
      </Routes>
    </>
  )
}

export default App
