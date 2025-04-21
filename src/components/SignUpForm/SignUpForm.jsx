import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { signUp } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const SignUpForm = () => {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
        displayname: '',
        bio: '',
    });

    const { username, password, passwordConf, displayname, bio, } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate('/profile/create');
        } catch (err) {
            setMessage(err.message);
        }
    };

    const isFormValid = () => {
        return !(username && password && password === passwordConf);
    };

    return (
        <main className="form">
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="username">*Username:</label>
                    <input 
                        type='text'
                        id='name'
                        value={username}
                        name='username'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">*Password:</label>
                    <input 
                        type='text'
                        id='password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="passwordConf">*Confirm Password:</label>
                    <input 
                        type='text'
                        id='confirm'
                        value={passwordConf}
                        name='passwordConf'
                        onChange={handleChange}
                        required
                    />
                </div>
                <hr />
                <div className="field">
                    <label htmlFor="displayname">Set a Displayname:</label>
                    <input 
                        type='text'
                        id='displayname'
                        value={displayname}
                        name='displayname'
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="bio">Write a bio for your profile:</label>
                    <textarea 
                        id='bio'
                        value={bio}
                        name='bio'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button disabled={isFormValid()}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    )

}


export default SignUpForm
