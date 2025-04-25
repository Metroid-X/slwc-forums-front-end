import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as profileService from '../../services/profileService';
import * as forumService from '../../services/forumService';
import * as topicService from '../../services/topicService';
import * as commentService from '../../services/commentService';

const ProfileForm = ({getFuncs}) => {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    
    const { getSortedByDate, writeDate } = getFuncs
    
    const [formData, setFormData] = useState({
        displayName: profile.displayName,
        avatar: profile?.avatar,
        bio: profile?.bio,
        dateUpdated: Date.now(),
    })

    useEffect(() => {
        
        const fetchStuff = async () => {
            try {

                const fetchedDisplay = await profileService.userprofile(params.profileId);
                console.log(fetchedDisplay);
                setProfile({...fetchedDisplay});

                setFormData({
                    displayName: fetchedDisplay?.displayName,
                    avatar: fetchedDisplay?.avatar,
                    bio: fetchedDisplay?.bio,
                });

            } catch (err) {
                console.log(err);
            }
        };

        if (user) fetchStuff();


    }, [user]);
    
    
    
    const { displayName, avatar, bio, } = formData;

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const updatedProfile = await profileService.updateProfile(formData,params.profileId);
            console.log(updatedProfile);
            setProfile({...profile, updatedProfile});
        } catch (err) {
            console.log(err);
        }
    }

    const isFormInvalid = () => {
        return !(
            displayName && avatar
            &&
            (
                displayName !== profile.displayName
                || bio !== profile.bio ||
                avatar !== profile.avatar
            )
        );
    };

    console.log(formData);
    
    return (
        <main>
            <form 
                onSubmit={handleSubmit}
                id="profile-form"
                className="top-box"
            >
                <div className="field">
                    <label htmlFor="displayName">Displayname:</label>
                    <input 
                        id="displayName" 
                        type="text"
                        defaultValue={profile?.displayName}
                        onChange={handleChange}
                        name="displayName"
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="avatar">Avatar:</label>
                    <input 
                        id="avatar" 
                        type="text"
                        defaultValue={profile?.avatar}
                        onChange={handleChange}
                        name="avatar"
                    />
                </div>
                <div className="field">
                    <label htmlFor="bio">Bio:</label>
                    <textarea 
                        id="bio" 
                        defaultValue={profile?.bio}
                        onChange={handleChange}
                        name="bio"
                        required
                    />
                </div>
                <div className="field side-by-side">
                    <button disabled={isFormInvalid()} className="padded ">
                        Confirm Edit Profile
                    </button>
                    <button 
                        onClick={() => navigate(`/profiles/${profile?.displayName}/${profile?._id}`)} 
                        className="padded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}

export default ProfileForm