import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import Forums from './components/Forums/Forums';
import Topics from './components/Forums/Topics';
import NewTopicForm from './components/ForumForms/NewTopicForm';
import EditTopicForm from './components/ForumForms/EditTopicForm';
import ProfileForm from './components/ProfileForm/ProfileForm';
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

        if (user) {
          const fetchedUserProfile = await profileService.userprofile(user?.profile);
          // console.log(fetchedUserProfile);
          setUserProfile({...fetchedUserProfile});
        }
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

  /**
   * 
   * @param {String} headerString 
   * @param {Date} datePost 
   * @param {Date} dateUpdate 
   * @returns String
   */

  const writeDate = (headerString, datePost, dateUpdate=undefined) => {
    
    const datePosted = new Date(datePost); const dateUpdated = new Date(dateUpdate)

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${headerString} ${dateUpdated?(
      `${months[datePosted.getMonth()]} ${datePosted.getDate()}, ${datePosted.getFullYear()}`
    ):(
      `${months[datePosted.getMonth()]} ${datePosted.getDate()}, ${datePosted.getFullYear()}; Updated ${months[dateUpdated.getMonth()]} ${dateUpdated.getDate()}, ${dateUpdated.getFullYear()}`
    )}`;
  };

  const handleChange = (evt) => {
    setMessage('');
    setFormData({...formData, [evt.target.name]: evt.target.value });
  }


  const props = { users, profiles, forums, topics, comments, forum, handleForum, };

  const getSomeId = (id,elem) => {
    return elem.find(({_id}) => _id === id);
  };

  const getSortedByDate = (forumItems) => {
    return forumItems?.sort((a, b) => 
        Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)
        ||
        Date.parse(b.dateUpdated) - Date.parse(a.datePosted)
        ||
        Date.parse(b.datePosted) - Date.parse(a.dateUpdated)
        ||
        Date.parse(b.datePosted) - Date.parse(a.datePosted)
    );
  };
  
  const getLatestWithin = (_id, array, idkey) => {
    return getSortedByDate(array).find(elem => elem[idkey]===_id);
  };

  const getFuncs = { getSomeId, getSortedByDate, getLatestWithin, writeDate, handleChange, }

  return (
    <>
    <div>
      {user?(<>Hello, {userProfile?.displayName}</>):(<>Hello, Guest</>)}.
    </div>
      <NavBar props={props} />
      <Routes>
        <Route path='/' element={ <Landing forums={forums} topics={topics} profiles={profiles} getFuncs={getFuncs} />} />
        <Route path='/users' element={ user ? <Dashboard props={props} getFuncs={getFuncs} /> : <Landing forums={forums} topics={topics} getFuncs={getFuncs}  /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/profiles/:userName/:profileId' element={<UserProfile getFuncs={getFuncs}/>} />
        <Route path='/profiles/:userName/:profileId/edit' element={<ProfileForm getFuncs={getFuncs}/>} />
        <Route path='/topics/new' element={<NewTopicForm props={props} getFuncs={getFuncs} />} />
        <Route path='/forum/search' element={<SearchTags props={props} getFuncs={getFuncs} searchbar={true} />} />
        <Route path='/forum/search/:tags' element={<SearchTags props={props} getFuncs={getFuncs} searchbar={true} />} />
        <Route path='/forums/:branchName/new' element={<NewTopicForm props={props} getFuncs={getFuncs} />} />
        <Route path='/forums/:branchName' element={<Forums props={props} getFuncs={getFuncs} />} />
        <Route path='/forums/:branchName/:topicId' element={<Topics props={props} getFuncs={getFuncs} />} />
        <Route path='/forums/:branchName/:topicId/edit' element={<EditTopicForm props={props} getFuncs={getFuncs} />} />
        <Route path='/forums/:branchName/:topicId/comment/:commentId' element={<Topics props={props} getFuncs={getFuncs} />} />
      </Routes>
    </>
  )
}

export default App
