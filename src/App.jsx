import { useContext } from 'react';
import { Routes, Route, useParams } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import Forums from './components/Forums/Forums';
import NewTopicForm from './components/ForumForms/NewTopicForm'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';

import { UserContext } from './contexts/UserContext';

import './App.css'


const App = () => {
  const { user } = useContext(UserContext);
  const params = useParams();

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={ <Landing />} />
        <Route path='/users' element={ user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/profiles/:userName/:profileId' element={<UserProfile />} />
        <Route path='/forums/:branchName' element={<Forums />} />
        <Route path='/forums/:branchName/new' element={<NewTopicForm />} />
      </Routes>
    </>
  )
}

export default App
