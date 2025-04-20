import { useContext } from 'react';
import { Routes, Route, useParams } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';

import { UserContext } from './contexts/UserContext';

import './App.css'


const App = () => {
  const { user } = useContext(UserContext);
  let params = useParams();

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={ user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/users/:userName/:profileId' element={<UserProfile />} />
      </Routes>
    </>
  )
}

export default App
