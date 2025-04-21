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
            <ProfileComponent profileId={params.profileId} userName={params.userName} />
        </main>
    )
}


export default UserProfile;
