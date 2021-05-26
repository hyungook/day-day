import React from 'react';
import { authService } from '../../firebase'
import { useHistory } from 'react-router-dom';
// import { authService } from 'firebase';

const Profile = (props) => {

    const onLogOutClick = () => {

        const history = useHistory;
        history.push('/');

        authService.signOut();
        console.log('logOut')
    };

    return <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
}

export default Profile;