import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import ProfileComponent from "./ProfileComponent";

import * as userService from '../../services/userService';
import * as profileService from '../../services/profileService';

const UserProfile = () => {
    let params = useParams()
    const { user } = useContext(UserContext);
    
    return (
        <main>
            <h3>This is a temporary page for displaying a user profile.</h3>
            Username: {params.userName}
            <br/>
            <ProfileComponent profileId={params.profileId} userName={params.userName} />
        </main>
    )
}


export default UserProfile;
